import { PortableTextBlock } from "sanity";

export type aboutSchema = {
  _id: string;
  _createdAt: Date;
  title: {
    teal: string;
    black: string;
  };
  description: PortableTextBlock[];
  image: {
    url: string;
  };
  circularProgress: {
    circularProgressOne: {
      percentage: number;
      text: PortableTextBlock[];
    };
    circularProgressTwo: {
      percentage: number;
      text: PortableTextBlock[];
    };
    circularProgressThree: {
      percentage: number;
      text: PortableTextBlock[];
    };
  };
  expandingWindow: {
    image: {
      url: string;
    };
    text: PortableTextBlock[];
  };
  sideScroll: {
    headingSmall: string;
    headingBig: PortableTextBlock[];
    text: PortableTextBlock[];
    image: {
      url: string;
    };
    scrollableTabs: {
      tabOne: {
        number: number;
        heading: string;
        text: PortableTextBlock[];
      };
      tabTwo: {
        number: number;
        heading: string;
        text: PortableTextBlock[];
      };
      tabThree: {
        number: number;
        heading: string;
        text: PortableTextBlock[];
      };
      tabFour: {
        number: number;
        heading: string;
        text: PortableTextBlock[];
      };
      tabFive: {
        number: number;
        heading: string;
        text: PortableTextBlock[];
      };
    };
  };
  team: [
    {
      heading: string;
      image: {
        url: string;
      };
      name: string;
      job: string;
      instagram: string;
      linkedin: string;
    }
  ];
};
