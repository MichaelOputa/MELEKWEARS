import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { thumbSrc } from '@/lib/images';

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'loading'> {
  src: string;
  /** Use the small version. For grids, cards, lists and thumbnails strips (anything under ~500px wide). */
  thumb?: boolean;
  /** Above-the-fold image: load straight away at high priority instead of lazily. */
  priority?: boolean;
  /** Fade the image in when it has loaded (turn off if the image animates its own opacity). Default: true. */
  fade?: boolean;
}

/**
 * Drop-in replacement for <img> that keeps pages fast:
 *  - off-screen images only load when the visitor scrolls near them
 *  - `thumb` loads the small copy, falling back to the full photo if a thumbnail is missing
 *  - the image fades in over the container's background instead of popping in
 */
export default function Img({
  src,
  thumb = false,
  priority = false,
  fade = true,
  className = '',
  style,
  onLoad,
  onError,
  ...rest
}: ImgProps) {
  const wanted = thumb ? thumbSrc(src) : src;
  const [failedFor, setFailedFor] = useState<string | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const ref = useRef<HTMLImageElement>(null);

  const current = failedFor === wanted ? src : wanted;
  const loaded = loadedSrc === current;

  // A cached image can finish loading before React attaches onLoad.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth > 0) setLoadedSrc(current);
  }, [current]);

  const priorityAttrs = priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {};

  return (
    <img
      ref={ref}
      src={current}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...priorityAttrs}
      {...rest}
      onLoad={(e) => {
        setLoadedSrc(current);
        onLoad?.(e);
      }}
      onError={(e) => {
        if (current !== src) setFailedFor(wanted);
        onError?.(e);
      }}
      className={`${className} ${fade && loaded ? 'img-in' : ''}`.trim()}
      style={fade && !loaded ? { ...style, opacity: 0 } : style}
    />
  );
}
