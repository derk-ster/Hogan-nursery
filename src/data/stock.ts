export type StockStatus =
  | "in_stock"
  | "low_stock"
  | "call_first"
  | "seasonal";

export interface StockItem {
  id: string;
  productId?: string;
  name: string;
  category: string;
  status: StockStatus;
  note: string;
  seenInStore: boolean;
  galleryImage?: string;
}

export const stockDisclaimer =
  "Status is based on recent yard photos and typical inventory. Stock changes daily. Call before you visit for something specific.";

export const stockStatusLabels: Record<
  StockStatus,
  { label: string; short: string }
> = {
  in_stock: { label: "In Stock", short: "In stock" },
  low_stock: { label: "Low Stock", short: "Low" },
  call_first: { label: "Call to Confirm", short: "Call" },
  seasonal: { label: "Seasonal", short: "Seasonal" },
};

/** Demo stock list — update when yard photos or staff notes change. */
export const stockItems: StockItem[] = [
  {
    id: "stock-violas",
    productId: "violias-flat",
    name: "Flat of Violas",
    category: "Flower Flats",
    status: "in_stock",
    note: "Seasonal bedding flats on the lot.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145431.png",
  },
  {
    id: "stock-flower-flats",
    productId: "flower-flats",
    name: "Flower Flats",
    category: "Flower Flats",
    status: "in_stock",
    note: "Color flats in rows on the gravel lot.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145431.png",
  },
  {
    id: "stock-marigolds",
    name: "Marigolds and Annuals",
    category: "Flower Flats",
    status: "in_stock",
    note: "Yellow and orange blooms in display rows.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145359.png",
  },
  {
    id: "stock-crossvine",
    productId: "tangerine-crossvine",
    name: "Tangerine Crossvine",
    category: "Vines",
    status: "in_stock",
    note: "Crossvine on trellis in nursery pots seen on site.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145405.png",
  },
  {
    id: "stock-vines",
    name: "Vines",
    category: "Vines",
    status: "low_stock",
    note: "Selection varies. Ask which climbers are ready today.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145405.png",
  },
  {
    id: "stock-ground-cover",
    productId: "ground-cover",
    name: "Ground Cover",
    category: "Ground Cover",
    status: "in_stock",
    note: "Ground cover trays and sweet potato vine color.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145411.png",
  },
  {
    id: "stock-abelia",
    productId: "abelia",
    name: "Abelia",
    category: "Shrubs",
    status: "in_stock",
    note: "Abelia shrubs on the lot, including variegated types.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145435.png",
  },
  {
    id: "stock-shrubs",
    productId: "shrubs-general",
    name: "Shrubs",
    category: "Shrubs",
    status: "in_stock",
    note: "Packed shrub rows in black nursery pots.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145359.png",
  },
  {
    id: "stock-texas-sage",
    productId: "texas-sage",
    name: "Texas Sage Shrubs",
    category: "Shrubs",
    status: "in_stock",
    note: "North Texas staple. Sizes vary on the lot.",
    seenInStore: false,
  },
  {
    id: "stock-purple-sage",
    productId: "purple-sage",
    name: "Purple Sage Shrubs",
    category: "Shrubs",
    status: "low_stock",
    note: "Ask staff what purple sage is on hand today.",
    seenInStore: false,
  },
  {
    id: "stock-small-trees",
    productId: "small-trees",
    name: "Small Trees",
    category: "Trees",
    status: "in_stock",
    note: "Ornamental trees in nursery pots, including maple types.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145424.png",
  },
  {
    id: "stock-crape-myrtle",
    productId: "crape-myrtle",
    name: "Crape Myrtle Trees",
    category: "Trees",
    status: "call_first",
    note: "Sizes and colors change often. Call for your pick.",
    seenInStore: false,
  },
  {
    id: "stock-evergreens",
    productId: "evergreens",
    name: "Evergreens",
    category: "Trees & Shrubs",
    status: "call_first",
    note: "Screening stock rotates. Call ahead for project sizes.",
    seenInStore: false,
  },
  {
    id: "stock-yucca",
    productId: "soft-leaf-yucca",
    name: "Soft Leaf Yucca",
    category: "Yucca & Agave",
    status: "call_first",
    note: "Hard to find varieties. Call for what is on the lot.",
    seenInStore: false,
  },
  {
    id: "stock-red-yucca",
    productId: "red-yucca",
    name: "Red Yuccas",
    category: "Yucca & Agave",
    status: "low_stock",
    note: "Popular accent. Ask for sizes available today.",
    seenInStore: false,
  },
  {
    id: "stock-gardenias",
    productId: "gardenias",
    name: "Gardenias",
    category: "Shrubs",
    status: "seasonal",
    note: "Fragrant shrubs when in season. Call first.",
    seenInStore: false,
  },
  {
    id: "stock-soil",
    productId: "soil-bags",
    name: "Soil Bags",
    category: "Landscape Supplies",
    status: "in_stock",
    note: "Bagged soil and supplies stacked on site.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145431.png",
  },
  {
    id: "stock-mulch",
    name: "Mulch and Bagged Goods",
    category: "Landscape Supplies",
    status: "in_stock",
    note: "White bagged goods on pallets in the yard.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145431.png",
  },
  {
    id: "stock-perennials",
    name: "Bed Perennials",
    category: "Flower Flats",
    status: "low_stock",
    note: "Seasonal color for beds. Ask what is blooming now.",
    seenInStore: true,
    galleryImage: "Screenshot 2026-05-29 145416.png",
  },
];

export function getStockByProductId(productId: string): StockItem | undefined {
  return stockItems.find((s) => s.productId === productId);
}

export function getStockCounts() {
  return stockItems.reduce(
    (acc, item) => {
      acc[item.status] += 1;
      acc.total += 1;
      if (item.seenInStore) acc.seen += 1;
      return acc;
    },
    { in_stock: 0, low_stock: 0, call_first: 0, seasonal: 0, total: 0, seen: 0 }
  );
}
