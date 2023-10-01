import { PortableTextBlock } from "sanity";
import { category } from "./Category";

export type products = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  images: [
    image: {
      _id: string;
      url: string;
    }
  ];
  price: string;
  details: PortableTextBlock[];
  description: PortableTextBlock[];
  size: string[];
  category: category;
  type: string;
  searchTags: { current: string };
  sku: string;
  isAvailable: boolean;
};
