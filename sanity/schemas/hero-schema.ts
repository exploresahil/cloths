const heros = {
  name: "heros",
  title: "Heros",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "catogery_video",
      title: "Catogery",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "video_url",
      title: "Video URL",
      type: "string",
    },
  ],
};

export default heros;
