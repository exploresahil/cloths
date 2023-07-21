const faqsSchema = {
  name: "faqs",
  title: "FAQs",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
    },
  ],
};

export default faqsSchema;
