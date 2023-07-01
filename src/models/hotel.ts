type Hotel = {
  name?: string;
  id?: string;
  type?: string;
  price?: number;
  address?: {
    full?: string;
    postalCode?: string;
    street?: string;
    country?: string;
    region?: string;
  };
  location?: { lat: number; lng: number };
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
  reviews?: {}[];
} | null;
