import { getStockByProductId, type StockStatus } from "@/data/stock";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  price: string;
  stockStatus: StockStatus;
  stockNote: string;
}

function withStock(
  product: Omit<Product, "stockStatus" | "stockNote">
): Product {
  const stock = getStockByProductId(product.id);
  return {
    ...product,
    stockStatus: stock?.status ?? "call_first",
    stockNote: stock?.note ?? "Call to check current stock.",
  };
}

const productBase: Omit<Product, "stockStatus" | "stockNote">[] = [
  {
    id: "violias-flat",
    name: "Flat of Violas",
    category: "Flower Flats",
    description: "Seasonal color for beds and pots.",
    badge: "Popular",
    price: "$18.99",
  },
  {
    id: "soft-leaf-yucca",
    name: "Soft Leaf Yucca",
    category: "Yucca & Agave",
    description: "Hardy accent plants. Varieties may vary.",
    badge: "Hard to Find",
    price: "$42.00",
  },
  {
    id: "tangerine-crossvine",
    name: "Tangerine Crossvine",
    category: "Vines",
    description: "Showy vine for fences and trellises.",
    badge: "North Texas",
    price: "$28.50",
  },
  {
    id: "gardenias",
    name: "Gardenias",
    category: "Shrubs",
    description: "Fragrant shrubs when in season.",
    badge: "Seasonal",
    price: "$34.99",
  },
  {
    id: "ground-cover",
    name: "Ground Cover",
    category: "Ground Cover",
    description: "Options for sun or shade beds. Staff can help you choose.",
    badge: "Staff Pick",
    price: "From $6.99",
  },
  {
    id: "abelia",
    name: "Abelia",
    category: "Shrubs",
    description: "Several varieties carried. Call for the one you need.",
    badge: "Hard to Find",
    price: "$38.00",
  },
  {
    id: "crape-myrtle",
    name: "Crape Myrtle Trees",
    category: "Trees",
    description: "Sizes and colors vary. Worth calling ahead for your pick.",
    badge: "Trees",
    price: "From $89.00",
  },
  {
    id: "texas-sage",
    name: "Texas Sage Shrubs",
    category: "Shrubs",
    description: "Tough North Texas favorite.",
    badge: "North Texas",
    price: "$32.00",
  },
  {
    id: "purple-sage",
    name: "Purple Sage Shrubs",
    category: "Shrubs",
    description: "Low maintenance color for sunny spots.",
    badge: "Low Maintenance",
    price: "$29.99",
  },
  {
    id: "red-yucca",
    name: "Red Yuccas",
    category: "Yucca & Agave",
    description: "Drought friendly accent. Call for sizes on hand.",
    badge: "Drought Tough",
    price: "$36.00",
  },
  {
    id: "evergreens",
    name: "Evergreens",
    category: "Trees & Shrubs",
    description: "Screening and structure plants. Selection changes often.",
    badge: "Project Help",
    price: "From $65.00",
  },
  {
    id: "flower-flats",
    name: "Flower Flats",
    category: "Flower Flats",
    description: "Seasonal bedding plants. Good prices on flats when in stock.",
    badge: "Good Price",
    price: "$16.99",
  },
  {
    id: "shrubs-general",
    name: "Shrubs",
    category: "Shrubs",
    description: "Wide shrub selection packed tight in the yard. Ask staff what fits.",
    badge: "Variety",
    price: "From $24.99",
  },
  {
    id: "small-trees",
    name: "Small Trees",
    category: "Trees",
    description: "Ornamental and shade options on the lot today.",
    badge: "Trees",
    price: "From $79.00",
  },
  {
    id: "soil-bags",
    name: "Soil Bags",
    category: "Landscape Supplies",
    description: "Bagged soil and amendments for beds and pots.",
    badge: "Supplies",
    price: "$8.99",
  },
  {
    id: "landscape-project",
    name: "Landscape Project Plants",
    category: "Mixed",
    description: "Bring photos of your space. Staff can help plan plant picks.",
    badge: "Project Help",
    price: "Varies",
  },
];

export const products: Product[] = productBase.map(withStock);

// Landscape project has no single stock row — always call
products.find((p) => p.id === "landscape-project")!.stockStatus = "call_first";
products.find((p) => p.id === "landscape-project")!.stockNote =
  "Bring photos. Staff will help you build a list on site.";
