import { PortableTextBlock } from "sanity";

export type blogsSchema = {
  _id: string;
  _createdAt: Date;
  topic: {
    _id: string;
    _createdAt: Date;
    name: string;
    slug: string;
  };
  name: string;
  title: PortableTextBlock[];
  slug: string;
  image: {
    url: string;
  };
  description: PortableTextBlock[];
  content: PortableTextBlock[];
};
