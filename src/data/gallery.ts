import { galleryImagePath } from "@/lib/assets";

export interface GalleryItem {
  id: string;
  image: string | null;
  title: string;
  category: string;
  caption: string;
  tags: string[];
  alt: string;
  placeholder?: boolean;
  seenInStore?: boolean;
}

const shots = {
  marigolds: "Screenshot 2026-05-29 145359.png",
  crossvine: "Screenshot 2026-05-29 145405.png",
  groundCover: "Screenshot 2026-05-29 145411.png",
  perennials: "Screenshot 2026-05-29 145416.png",
  maples: "Screenshot 2026-05-29 145424.png",
  yard: "Screenshot 2026-05-29 145431.png",
  abelia: "Screenshot 2026-05-29 145435.png",
} as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "flower-flats-rows",
    image: galleryImagePath(shots.marigolds),
    title: "Flower Flats and Ground Cover",
    category: "Flowers",
    caption: "Marigolds, ground cover color, and shrubs in nursery pots.",
    tags: ["Flower flats", "Ground cover", "Shrubs", "Seen in store"],
    alt: "Rows of marigolds and green and purple sweet potato vine ground cover at Hogan Nursery",
    seenInStore: true,
  },
  {
    id: "crossvine-trellis",
    image: galleryImagePath(shots.crossvine),
    title: "Vines on Trellis",
    category: "Vines",
    caption: "Crossvine with orange and yellow blooms in nursery pots.",
    tags: ["Vines", "Crossvine", "Seen in store"],
    alt: "Crossvine plant on a bamboo trellis in a black nursery pot",
    seenInStore: true,
  },
  {
    id: "ground-cover-trays",
    image: galleryImagePath(shots.groundCover),
    title: "Ground Cover",
    category: "Ground Cover",
    caption: "Dense green ground cover trays ready to plant.",
    tags: ["Ground cover", "Seen in store"],
    alt: "Healthy green ground cover plants in nursery trays",
    seenInStore: true,
  },
  {
    id: "bed-perennials",
    image: galleryImagePath(shots.perennials),
    title: "Bed Perennials",
    category: "Flowers",
    caption: "Yellow and red perennials for sunny flower beds.",
    tags: ["Flower beds", "Perennials", "Seen in store"],
    alt: "Yellow and red flowering perennial in a landscaped bed",
    seenInStore: true,
  },
  {
    id: "small-trees-maples",
    image: galleryImagePath(shots.maples),
    title: "Small Trees",
    category: "Trees",
    caption: "Japanese maple types in large nursery pots.",
    tags: ["Trees", "Small trees", "Seen in store"],
    alt: "Green and purple leaf Japanese maple trees in black nursery pots",
    seenInStore: true,
  },
  {
    id: "nursery-yard",
    image: galleryImagePath(shots.yard),
    title: "Nursery Yard",
    category: "Nursery Yard",
    caption: "Gravel paths, color flats, foliage benches, and bagged supplies.",
    tags: ["Nursery yard", "Flower flats", "Soil bags", "Seen in store"],
    alt: "Wide view of Hogan Nursery yard with flower flats and bagged supplies",
    seenInStore: true,
  },
  {
    id: "abelia-shrub",
    image: galleryImagePath(shots.abelia),
    title: "Abelia Shrubs",
    category: "Shrubs",
    caption: "Variegated abelia in nursery pots on mulch.",
    tags: ["Abelia", "Shrubs", "Hard to find", "Seen in store"],
    alt: "Variegated green and yellow abelia shrub in a black nursery pot with plant tag",
    seenInStore: true,
  },
];

export { shots as galleryFilenames };
