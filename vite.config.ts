import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';

/**
 * COLLECTION FOLDER IMAGES
 *
 * Builds `virtual:collection-images` — every web-displayable image found in each
 * collection's folder under /public/images. The Shop page uses it, so dropping a
 * new photo into a folder is all it takes for it to appear (restart `npm run dev`
 * if the dev server is already running).
 *
 * .heic files are skipped because most browsers can't display them; keep a
 * .jpg copy of any .heic photo next to it.
 */
const COLLECTION_FOLDERS: Record<string, string> = {
  Atelier: 'atelier',
  'Melek Luxe Collections': 'melekluxe',
  Riviera: 'rivieracollection',
  'Melek Essentials': 'melekessentials',
};

const WEB_IMAGE = /\.(jpe?g|png|webp|gif|avif)$/i;

function collectionImages(): Plugin {
  const virtualId = 'virtual:collection-images';
  const resolvedId = '\0' + virtualId;

  return {
    name: 'collection-images',
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return;
      const result: Record<string, string[]> = {};
      for (const [collection, folder] of Object.entries(COLLECTION_FOLDERS)) {
        const dir = fileURLToPath(new URL(`./public/images/${folder}`, import.meta.url));
        result[collection] = fs
          .readdirSync(dir)
          .filter((file) => WEB_IMAGE.test(file))
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
          .map((file) => `/images/${folder}/${encodeURI(file)}`);
      }
      return `export const collectionFolderImages = ${JSON.stringify(result)};`;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), collectionImages()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
