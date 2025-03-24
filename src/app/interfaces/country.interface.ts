export interface CountryData {
  name: string;
  slogan: string;
  bannerImages: Array<{src: string, alt: string}>;
  universities: Array<{
    name: string;
    image: string;
    description: string;
    founded: string;
    location: string;
    ranking: string;
  }>;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  callToAction: {
    title: string;
    description: string;
  };
} 