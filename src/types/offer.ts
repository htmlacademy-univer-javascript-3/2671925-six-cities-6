export type Location = {
  latitude: number;
  longitude: number;
};

export type Review = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  previewImage: string;
  images: string[];
  city: string;
  location: Location;
  isPremium: boolean;
  isFavorite: boolean;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  description: string;
};
