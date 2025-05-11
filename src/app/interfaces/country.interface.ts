export interface CountryData {
  name: string;
  slogan: string;
  bannerImages: {
    src: string;
    alt: string;
  }[];
  universities: University[];
  benefits: string;
  callToAction: {
    title: string;
    description: string;
  };
}

export interface University {
  name: string;
  description: string;
  image: string;
  location: string;
  website?: string;
  expanded?: boolean;
} 