const policiesSchema = {
  name: "policies",
  title: "Policies",
  type: "document",
  fields: [
    {
      name: "refund",
      title: "Refund & Return Policy",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
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
    },
    {
      name: "shipping",
      title: "Shipping Policy",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
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
    },
    {
      name: "privacy",
      title: "Privacy Policy",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
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
    },
  ],
};

export default policiesSchema;
