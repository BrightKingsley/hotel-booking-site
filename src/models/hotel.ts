type Hotel = {
  name: string;
  id: string;
  type: string;
  price: number;
  address: string;
  location: { lat: string; lng: string };
  rating: number;
  amenities: {
    wifi: boolean;
    pool: boolean;
    pets: boolean;
    ac: boolean;
    parking: boolean;
    hotelBar: boolean;
    gym: boolean;
    spa: boolean;
    restaurant: boolean;
  };
  contact: string;
  images: string[];
  description: string;
  reviews: {}[];
};
