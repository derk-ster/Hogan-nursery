export interface Review {
  id: string;
  quote: string;
  tags: string[];
}

export const reviewTags = [
  "Friendly Staff",
  "Patient Help",
  "Owner Help",
  "Plants",
  "Planting",
  "Good Prices",
  "Local Business",
  "Hard to Find Plants",
] as const;

export const reviews: Review[] = [
  {
    id: "1",
    quote: "Best price around right now.",
    tags: ["Good Prices"],
  },
  {
    id: "2",
    quote: "The variety is absolutely incredible.",
    tags: ["Plants", "Hard to Find Plants"],
  },
  {
    id: "3",
    quote:
      "They walk me through the planting area and if it works for my space.",
    tags: ["Friendly Staff", "Planting"],
  },
  {
    id: "4",
    quote: "Hogan was the only nursery that had my variety in stock.",
    tags: ["Hard to Find Plants"],
  },
  {
    id: "5",
    quote: "Their staff, stock, and location are excellent.",
    tags: ["Friendly Staff", "Plants"],
  },
  {
    id: "6",
    quote:
      "Everyone there was knowledgeable, friendly, hard working, honest, and patient.",
    tags: ["Friendly Staff", "Patient Help"],
  },
  {
    id: "7",
    quote: "I'll never go back to Home Depot or Lowe's for my gardening needs.",
    tags: ["Local Business", "Plants"],
  },
  {
    id: "8",
    quote:
      "Best little nursery in North Texas due to very healthy plants and unbeatable prices.",
    tags: ["Plants", "Good Prices"],
  },
  {
    id: "9",
    quote: "They will take special order requests for anything hard to find.",
    tags: ["Hard to Find Plants", "Owner Help"],
  },
  {
    id: "10",
    quote: "Great prices, great service, and great looking trees and plants.",
    tags: ["Good Prices", "Plants"],
  },
];
