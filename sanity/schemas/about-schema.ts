const aboutSchema = {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        {
          name: "teal",
          title: "Teal Colored",
          type: "string",
        },
        {
          name: "black",
          title: "Black Colored",
          type: "string",
        },
      ],
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "image",
      title: "Left-side Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "circularProgress",
      title: "Circular Percentage Bars",
      type: "object",
      fields: [
        {
          name: "circularProgressOne",
          title: "Circular Progress Bar 1",
          type: "object",
          fields: [
            {
              name: "percentage",
              title: "Percentage",
              type: "number",
            },
            {
              name: "text",
              title: "Text",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
        {
          name: "circularProgressTwo",
          title: "Circular Progress Bar 2",
          type: "object",
          fields: [
            {
              name: "percentage",
              title: "Percentage",
              type: "number",
            },
            {
              name: "text",
              title: "Text",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
        {
          name: "circularProgressThree",
          title: "Circular Progress Bar 3",
          type: "object",
          fields: [
            {
              name: "percentage",
              title: "Percentage",
              type: "number",
            },
            {
              name: "text",
              title: "Text",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    },
    {
      name: "expandingWindow",
      title: "Expanding Window Section",
      type: "object",
      fields: [
        {
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          validation: (Rule: { required: () => any }) => Rule.required(),
        },
        {
          name: "text",
          title: "Text",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
    {
      name: "sideScroll",
      title: "Side Scroll Section",
      type: "object",
      fields: [
        {
          name: "headingSmall",
          title: "Heading Small",
          type: "string",
        },
        {
          name: "headingBig",
          title: "Heading Big",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "text",
          title: "Text",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          validation: (Rule: { required: () => any }) => Rule.required(),
        },
        {
          name: "scrollableTabs",
          title: "Scrollable Tabs",
          type: "object",
          fields: [
            {
              name: "tabOne",
              title: "Tab 1",
              type: "object",
              fields: [
                {
                  name: "number",
                  title: "Number",
                  type: "string",
                  // initialValue: "01",
                  // readOnly: true,
                },
                {
                  name: "heading",
                  title: "Heading",
                  type: "string",
                },
                {
                  name: "text",
                  title: "Text",
                  type: "array",
                  of: [{ type: "block" }],
                },
              ],
            },
            {
              name: "tabTwo",
              title: "Tab 2",
              type: "object",
              fields: [
                {
                  name: "number",
                  title: "Number",
                  type: "string",
                  // initialValue: "02",
                  // readOnly: true,
                },
                {
                  name: "heading",
                  title: "Heading",
                  type: "string",
                },
                {
                  name: "text",
                  title: "Text",
                  type: "array",
                  of: [{ type: "block" }],
                },
              ],
            },
            {
              name: "tabThree",
              title: "Tab 3",
              type: "object",
              fields: [
                {
                  name: "number",
                  title: "Number",
                  type: "string",
                  // initialValue: "03",
                  // readOnly: true,
                },
                {
                  name: "heading",
                  title: "Heading",
                  type: "string",
                },
                {
                  name: "text",
                  title: "Text",
                  type: "array",
                  of: [{ type: "block" }],
                },
              ],
            },
            {
              name: "tabFour",
              title: "Tab 4",
              type: "object",
              fields: [
                {
                  name: "number",
                  title: "Number",
                  type: "string",
                  // initialValue: "04",
                  // readOnly: true,
                },
                {
                  name: "heading",
                  title: "Heading",
                  type: "string",
                },
                {
                  name: "text",
                  title: "Text",
                  type: "array",
                  of: [{ type: "block" }],
                },
              ],
            },
            {
              name: "tabFive",
              title: "Tab 5",
              type: "object",
              fields: [
                {
                  name: "number",
                  title: "Number",
                  type: "string",
                  // initialValue: "05",
                  // readOnly: true,
                },
                {
                  name: "heading",
                  title: "Heading",
                  type: "string",
                },
                {
                  name: "text",
                  title: "Text",
                  type: "array",
                  of: [{ type: "block" }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "team",
      title: "Team Section",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "heading",
              title: "Heading",
              type: "string",
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule: { required: () => any }) => Rule.required(),
            },
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "job",
              title: "Job",
              type: "string",
            },
            {
              name: "instagram",
              title: "Instagram Link",
              type: "string",
              initialValue: "#",
              validation: (Rule: { required: () => any }) => Rule.required(),
            },
            {
              name: "linkedin",
              title: "LinkedIn Link",
              type: "string",
              initialValue: "#",
              validation: (Rule: { required: () => any }) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};

export default aboutSchema;
