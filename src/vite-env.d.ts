/// <reference types="vite/client" />

declare module 'virtual:collection-images' {
  /** Every web-displayable image in each collection's /public/images folder, keyed by collection name. */
  export const collectionFolderImages: Record<string, string[]>;
}
