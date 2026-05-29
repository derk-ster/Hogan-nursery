export interface CategoryItem {
  id: string;
  name: string;
  note: string;
}

export interface Category {
  id: string;
  title: string;
  sentence: string;
  badge: string;
  visitListItems: string[];
  examples: CategoryItem[];
}

export const categories: Category[] = [
  {
    id: "trees",
    title: "Trees",
    sentence: "Shade, ornamental, and screening trees for North Texas yards.",
    badge: "Lot Stock",
    visitListItems: ["Small Trees", "Crape Myrtle Trees", "Evergreens"],
    examples: [
      { id: "t1", name: "Crape Myrtle Trees", note: "Sizes and colors vary by season." },
      { id: "t2", name: "Small Ornamental Trees", note: "Ask what is on the lot today." },
      { id: "t3", name: "Evergreens", note: "Good for privacy and wind breaks." },
    ],
  },
  {
    id: "shrubs",
    title: "Shrubs",
    sentence: "Foundation plants, screens, and color for beds and borders.",
    badge: "Wide Selection",
    visitListItems: ["Shrubs", "Texas Sage Shrubs", "Abelia", "Gardenias"],
    examples: [
      { id: "s1", name: "Texas Sage", note: "Tough and low maintenance." },
      { id: "s2", name: "Abelia", note: "Several varieties. Call for yours." },
      { id: "s3", name: "Purple Sage", note: "Sunny spots and dry beds." },
    ],
  },
  {
    id: "flower-flats",
    title: "Flower Flats",
    sentence: "Seasonal color for beds, pots, and quick curb appeal.",
    badge: "Good Prices",
    visitListItems: ["Flower Flats", "Flat of Violas"],
    examples: [
      { id: "f1", name: "Violas", note: "Popular flat for cool season color." },
      { id: "f2", name: "Seasonal Bedding", note: "Stock rotates through the year." },
      { id: "f3", name: "Mixed Flats", note: "Ask what is ready to plant now." },
    ],
  },
  {
    id: "yucca-agave",
    title: "Yucca & Agave Style Plants",
    sentence: "Accent plants you may not find at big box stores.",
    badge: "Hard to Find",
    visitListItems: ["Soft Leaf Yucca", "Red Yuccas"],
    examples: [
      { id: "y1", name: "Soft Leaf Yucca", note: "Customer favorite variety." },
      { id: "y2", name: "Red Yucca", note: "Drought friendly accent." },
      { id: "y3", name: "Yucca Varieties", note: "Selection changes. Call ahead." },
    ],
  },
  {
    id: "vines",
    title: "Vines",
    sentence: "Coverage for fences, trellises, and vertical interest.",
    badge: "Climbers",
    visitListItems: ["Tangerine Crossvine"],
    examples: [
      { id: "v1", name: "Tangerine Crossvine", note: "Showy blooms when established." },
      { id: "v2", name: "Seasonal Vines", note: "Ask staff what is in stock." },
      { id: "v3", name: "Trellis Plants", note: "Bring your sun and shade notes." },
    ],
  },
  {
    id: "ground-cover",
    title: "Ground Cover",
    sentence: "Low growers for beds, slopes, and under trees.",
    badge: "Bed Fillers",
    visitListItems: ["Ground Cover"],
    examples: [
      { id: "g1", name: "Sun Ground Cover", note: "For open beds and borders." },
      { id: "g2", name: "Shade Ground Cover", note: "Under trees and along paths." },
      { id: "g3", name: "Mixed Trays", note: "Staff can point you to the right row." },
    ],
  },
  {
    id: "gardenias",
    title: "Gardenias",
    sentence: "Fragrant shrubs when in season. Worth calling first.",
    badge: "Seasonal",
    visitListItems: ["Gardenias"],
    examples: [
      { id: "gd1", name: "Gardenia Shrubs", note: "Availability varies by season." },
      { id: "gd2", name: "Acid Loving Bed Prep", note: "Ask about soil when you visit." },
      { id: "gd3", name: "Potted Gardenias", note: "Good for patios when in stock." },
    ],
  },
  {
    id: "soil-supplies",
    title: "Soil & Landscape Supplies",
    sentence: "Bagged soil, mulch, pots, and project basics.",
    badge: "Supplies",
    visitListItems: ["Soil Bags", "Landscape Project Plants"],
    examples: [
      { id: "ss1", name: "Bagged Soil", note: "For beds, pots, and top dressing." },
      { id: "ss2", name: "Mulch", note: "Ask what is on hand today." },
      { id: "ss3", name: "Pots and Amendments", note: "Packed in with the plant rows." },
    ],
  },
  {
    id: "crape-myrtles",
    title: "Crape Myrtles",
    sentence: "A Hogan staple. Many customers call around until they find theirs here.",
    badge: "Customer Favorite",
    visitListItems: ["Crape Myrtle Trees"],
    examples: [
      { id: "cm1", name: "Crape Myrtle Trees", note: "Colors and heights vary." },
      { id: "cm2", name: "Multi Trunk Forms", note: "Ask what is on the lot." },
      { id: "cm3", name: "Single Trunk Trees", note: "Call to check size on hand." },
    ],
  },
  {
    id: "north-texas",
    title: "North Texas Favorites",
    sentence: "Plants picked for local heat, sun, and freeze cycles.",
    badge: "Local Knowledge",
    visitListItems: ["Texas Sage Shrubs", "Red Yuccas", "Purple Sage Shrubs"],
    examples: [
      { id: "nt1", name: "Texas Sage", note: "Classic North Texas shrub." },
      { id: "nt2", name: "Red Yucca", note: "Tough accent for sunny beds." },
      { id: "nt3", name: "Staff Picks", note: "Ask what they recommend this month." },
    ],
  },
];
