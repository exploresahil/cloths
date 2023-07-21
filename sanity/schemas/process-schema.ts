const process = {
  name: "process",
  title: "Process Section",
  type: "document",
  fields: [
    {
      name: "number",
      title: "Number",
      type: "string",
    },
    {
      name: "processName",
      title: "Process Name",
      type: "string",
    },
    {
      name: "image",
      title: "Process Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "imageAlt",
      title: "Image Alt",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 5, // optional: specify the number of rows for the input field
    },
  ],
};

export default process;
