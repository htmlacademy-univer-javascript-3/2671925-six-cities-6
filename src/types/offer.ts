export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type AuthData = {
  email: string;
  password: string;
};

export type Location = {
  latitude: number;
  longitude: number;
  zoom?: number;
};

export type City = {
  name: string;
  location: Location;
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
  images?: string[];
  city: City;
  location: Location;
  isPremium: boolean;
  isFavorite: boolean;
  bedrooms?: number;
  maxAdults?: number;
  goods?: string[];
  host?: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  description?: string;
};
