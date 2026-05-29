# Hogan Nursery assets

Drop images here for the demo site.

## Folders

- **google-maps-screenshots/** — Google Maps screenshots of the store, street view, or lot
- **gallery/** — Clean store and yard photos for the gallery section
- **products/** — Product or category photos (optional)

## File names

Use short, clear names:

- `trees-1.jpg`
- `shrubs-1.jpg`
- `flowers-1.jpg`
- `soil-1.jpg`
- `yard-1.jpg`

## After adding images

1. Open `src/data/gallery.ts` and `src/data/stock.ts`
2. Set each gallery `image` path (use `galleryImagePath()` in `src/lib/assets.ts` for filenames with spaces)
3. Update `title`, `caption`, `tags`, and `alt` from what you actually see in the photo
4. Update stock `status` (`in_stock`, `low_stock`, `call_first`, `seasonal`) and `seenInStore` flags
5. Do not invent exact product names unless the label is visible in the image (e.g. abelia tag on pot)

## Google Maps screenshots

Use screenshots to build "Seen in store" style captions and broad category tags (Trees, Shrubs, Flower flats, etc.).
