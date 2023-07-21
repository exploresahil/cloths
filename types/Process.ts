export type process = {
  _id: string;
  _createdAt: Date;
  number: string;
  processName: string;
  image: {
    url: string;
  };
  imageAlt: string;
  description: string;
};
