const blogsSchema = {
  name: "blogs",
  title: "Blogs",
  type: "document",
  fields: [
    {
      name: "topic",
      title: "Topic",
      type: "reference",
      to: [{ type: "topics" }],
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "title",
      title: "Title",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
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

export default blogsSchema;
