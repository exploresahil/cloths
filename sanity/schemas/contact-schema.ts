const contactSchema = {
  name: "contact",
  title: "Contact Us Info",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "phone",
      title: "Phone",
      type: "object",
      fields: [
        {
          name: "phoneNo",
          title: "Phone No. (Shown)",
          type: "string",
        },
        {
          name: "phoneLink",
          title: "Phone No. (Link)",
          type: "string",
          initialValue: "#",
        },
      ],
    },
    {
      name: "email",
      title: "Email",
      type: "object",
      fields: [
        {
          name: "emailId",
          title: "Email Id",
          type: "string",
        },
        {
          name: "emailLink",
          title: "Email Link",
          type: "string",
          initialValue: "#",
        },
      ],
    },
    {
      name: "instagram",
      title: "Instagram",
      type: "object",
      fields: [
        {
          name: "instagramUser",
          title: "Instagram Username",
          type: "string",
        },
        {
          name: "instagramLink",
          title: "Instagram Link",
          type: "string",
          initialValue: "#",
        },
      ],
    },
  ],
};

export default contactSchema;
