export type contactSchema = {
  _id: string;
  _createdAt: string;
  image: {
    url: string;
  };
  phone: {
    phoneNo: string;
    phoneLink: string;
  };
  email: {
    emailId: string;
    emailLink: string;
  };
  instagram: {
    instagramUser: string;
    instagramLink: string;
  };
};
