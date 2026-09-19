#!/usr/bin/env node
/**
 * Makes the site's photos fast to load.   Run with:   npm run images
 *
 * Phone photos are 3–12 MB each; a page that shows a few of them can pull tens of MB. This script,
 * for every photo inside a sub-folder of public/images (atelier, melekluxe, rivieracollection, ...):
 *
 *   1. Shrinks it in place to at most 1800px on its longest side (JPEG, quality 76) and strips
 *      the hidden metadata (camera info and GPS location).
 *   2. Turns PNG photos (no transparency) into .jpg — a PNG photo is 5-10x heavier — and updates
 *      any reference to them in src/.
 *   3. Makes a small copy (800px wide) in public/images/thumbs/ for grids, cards and lists.
 *      The <Img thumb> component in src/components/Img.tsx loads these.
 *
 * It is safe to run again: files that are already small are left untouched, and thumbnails are
 * only rebuilt when the photo changed. Logos directly inside public/images are never touched.
 * Keep your original full-size photos somewhere else (this replaces the copies in the repo).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const IMAGES_DIR = fileURLToPath(new URL('../public/images', import.meta.url));
const THUMBS_DIR = path.join(IMAGES_DIR, 'thumbs');
const SRC_DIR = fileURLToPath(new URL('../src', import.meta.url));

const MAX_SIDE = 1800;
const THUMB_WIDTH = 800;
const FULL_QUALITY = 76;
const THUMB_QUALITY = 72;
const LEAVE_ALONE_UNDER = 1_000_000; // bytes — a photo this small (and not oversized) is already fine
const THUMB_BACKGROUND = '#1c120e'; // used if a transparent PNG ever needs a thumbnail

const RASTER = /\.(jpe?g|png)$/i;
const posix = (p) => p.split(path.sep).join('/');
const mb = (bytes) => (bytes / 1e6).toFixed(1);

async function walk(dir, out = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (full === THUMBS_DIR) continue;
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

/** Photos inside sub-folders only (logos in the images root are left alone). */
const isPhoto = (file) => RASTER.test(file) && posix(path.relative(IMAGES_DIR, file)).includes('/');

async function optimizePhotos() {
  const renamed = []; // [oldRel, newRel]
  let before = 0;
  let after = 0;
  let touched = 0;

  for (const file of (await walk(IMAGES_DIR)).filter(isPhoto)) {
    const input = await fs.readFile(file);
    const meta = await sharp(input).metadata();
    const [w, h] = meta.orientation >= 5 ? [meta.height, meta.width] : [meta.width, meta.height];
    const oversized = Math.max(w, h) > MAX_SIDE;
    const isPng = /\.png$/i.test(file);
    const opaque = !meta.hasAlpha || (await sharp(input).stats()).isOpaque;

    before += input.length;
    const resize = { width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true };

    if (isPng && !opaque) {
      // transparent graphics stay PNG
      if (oversized) {
        const out = await sharp(input).resize(resize).png({ compressionLevel: 9, effort: 10 }).toBuffer();
        if (out.length < input.length) {
          await fs.writeFile(file, out);
          after += out.length;
          touched++;
          continue;
        }
      }
      after += input.length;
      continue;
    }

    if (isPng) {
      const target = file.replace(/\.png$/i, '.jpg');
      try {
        await fs.access(target);
        console.warn(`! ${posix(path.relative(IMAGES_DIR, file))}: ${path.basename(target)} already exists, left as PNG`);
        after += input.length;
        continue;
      } catch {
        /* target is free */
      }
      const out = await sharp(input).rotate().resize(resize).jpeg({ quality: FULL_QUALITY, mozjpeg: true }).toBuffer();
      await fs.writeFile(target, out);
      await fs.unlink(file);
      renamed.push([posix(path.relative(IMAGES_DIR, file)), posix(path.relative(IMAGES_DIR, target))]);
      after += out.length;
      touched++;
      continue;
    }

    if (!oversized && input.length <= LEAVE_ALONE_UNDER && !meta.exif) {
      after += input.length;
      continue;
    }
    const out = await sharp(input).rotate().resize(resize).jpeg({ quality: FULL_QUALITY, mozjpeg: true }).toBuffer();
    await fs.writeFile(file, out);
    after += out.length;
    touched++;
  }

  return { renamed, before, after, touched };
}

async function updateReferences(renamed) {
  if (!renamed.length) return 0;
  let filesChanged = 0;
  const walkSrc = async (dir) => {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walkSrc(full);
      else if (/\.(tsx?|css)$/.test(entry.name)) {
        const text = await fs.readFile(full, 'utf8');
        let next = text;
        for (const [from, to] of renamed) next = next.split(`/images/${from}`).join(`/images/${to}`);
        if (next !== text) {
          await fs.writeFile(full, next);
          filesChanged++;
        }
      }
    }
  };
  await walkSrc(SRC_DIR);
  return filesChanged;
}

async function makeThumbs() {
  let made = 0;
  let bytes = 0;
  const photos = (await walk(IMAGES_DIR)).filter(isPhoto);
  const wanted = new Set();

  for (const file of photos) {
    const rel = posix(path.relative(IMAGES_DIR, file));
    const thumb = path.join(THUMBS_DIR, `${rel}.jpg`);
    wanted.add(thumb);
    try {
      const [s, t] = await Promise.all([fs.stat(file), fs.stat(thumb)]);
      if (t.mtimeMs >= s.mtimeMs) {
        bytes += t.size;
        continue;
      }
    } catch {
      /* no thumbnail yet */
    }
    await fs.mkdir(path.dirname(thumb), { recursive: true });
    const out = await sharp(await fs.readFile(file))
      .rotate()
      .flatten({ background: THUMB_BACKGROUND })
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
      .toBuffer();
    await fs.writeFile(thumb, out);
    bytes += out.length;
    made++;
  }

  // remove thumbnails whose photo no longer exists
  let removed = 0;
  try {
    for (const thumb of await walkAll(THUMBS_DIR)) {
      if (!wanted.has(thumb)) {
        await fs.unlink(thumb);
        removed++;
      }
    }
  } catch {
    /* no thumbs folder yet */
  }
  return { made, removed, bytes };
}

async function walkAll(dir, out = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkAll(full, out);
    else out.push(full);
  }
  return out;
}

const photos = await optimizePhotos();
const refs = await updateReferences(photos.renamed);
const thumbs = await makeThumbs();

console.log(`Photos:     ${photos.touched} optimised, ${mb(photos.before)} MB -> ${mb(photos.after)} MB`);
if (photos.renamed.length) {
  console.log(`PNG -> JPG: ${photos.renamed.length} converted, references updated in ${refs} file(s) under src/`);
  for (const [from, to] of photos.renamed) console.log(`            ${from} -> ${to}`);
}
console.log(`Thumbnails: ${thumbs.made} created${thumbs.removed ? `, ${thumbs.removed} stale removed` : ''} (${mb(thumbs.bytes)} MB in total)`);
