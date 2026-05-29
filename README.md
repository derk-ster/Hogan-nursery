# Hogan Nursery & Landscape Supply (demo site)

Premium demo website for Hogan Nursery & Landscape Supply in Plano, TX.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### If you see `Cannot find module './611.js'` after refresh

That is a stale Next.js cache (often after mixing `npm run build` with `npm run dev`). Stop the dev server, then:

```bash
npm run dev:clean
```

Or manually: `npm run clean` then `npm run dev`.

## Build

```bash
npm run build
npm start
```

## Assets

Drop store photos in `public/assets/hogan-nursery/`. See `public/assets/hogan-nursery/README.md` and update `src/data/gallery.ts` when images are added.

## Features

- Warm nursery theme (cream, clay, olive)
- Product categories with explore drawer
- Yard Match Quiz (5 questions)
- Bring a Photo Helper
- Visit List (localStorage, no checkout)
- Open/closed hours badge
- Reviews, gallery placeholders, contact CTAs
