const GALLERY_BASE = "/assets/hogan-nursery/gallery";
const MAPS_BASE = "/assets/hogan-nursery/google-maps-screenshots";

/** Public URL for an asset filename (handles spaces). */
export function galleryImagePath(filename: string): string {
  return `${GALLERY_BASE}/${encodeURIComponent(filename)}`;
}

export function mapsImagePath(filename: string): string {
  return `${MAPS_BASE}/${encodeURIComponent(filename)}`;
}
