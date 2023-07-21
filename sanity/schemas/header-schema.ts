const headerSchema = {
  name: "header",
  title: "Header Section",
  type: "document",
  fields: [
    {
      name: "headerName",
      title: "Header Logo",
      type: "string",
    },
    {
      name: "image",
      title: "Header Logo Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "imageAlt",
      title: "Image Alt",
      type: "string",
    },
  ],
};

export default headerSchema;
