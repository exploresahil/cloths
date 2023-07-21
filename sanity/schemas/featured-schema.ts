const featuredSchema = {
  name: "featured",
  title: "Featured Blog",
  type: "document",
  fields: [
    {
      name: "topic",
      title: "Topic",
      type: "reference",
      to: [{ type: "topics" }],
    },
    {
      name: "title",
      title: "Title",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};

export default featuredSchema;
