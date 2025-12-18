export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  previewImage: string;
  images: string[];
  city: string;
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
