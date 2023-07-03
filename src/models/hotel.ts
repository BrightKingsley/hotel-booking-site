export type Hotel = {
  name?: string;
  id?: string;
  type?: string | null;
  price?: number;
  address?: {
    full?: string;
    postalCode?: string;
    street?: string;
    country?: string;
    region?: string;
  };
  location?: { lat: string; lng: string };
  rating?: number;
  amenities?: {
    wifi?: boolean;
    pool?: boolean;
    pets?: boolean;
    ac?: boolean;
    parking?: boolean;
    hotelBar?: boolean;
    gym?: boolean;
    spa?: boolean;
    restaurant?: boolean;
  };
  contact?: string;
  images?: string[];
  description?: string;
  reviews?: number;
  userReviews?: {
    title: string | null;
    score: number | null;
    positive: string | null;
    negative: string | null;
    travellerType: string | null;
    room: string | null;
    nightsStay: number | null;
    date: string | null;
    country: string | null;
    countryCode: string | null;
    photos: [] | null;
  }[];
} | null;
