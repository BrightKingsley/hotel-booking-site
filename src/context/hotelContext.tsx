import { useContext, useState } from "react";
import { createContext } from "react";
import AuthContext from "./authContext";
import { getHotel, getHotels } from "@/utils";
import { Hotel } from "@/models";

type HotelContextType = {
  hotels: Hotel[] | null;
  setLoading: Function;
  currentHotel: Hotel | null;
  loadHotel: Function;
  loadHotels: Function;
  params: string;
  setParams: Function;
};

const hotelContext = createContext<HotelContextType>({
  hotels: [],
  setLoading: () => {},
  currentHotel: null,
  loadHotel: () => {},
  loadHotels: () => {},
  params: "",
  setParams: () => {},
});

export const HotelContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentHotel, setCurrentHotel] = useState<Hotel | null>(null);
  const [hotels, setHotels] = useState<Hotel[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showHotelEdit, setShowHotelEdit] = useState(false);
  const [hotelEditType, setHotelEditType] = useState(false);
  const [params, setParams] = useState("");

  // const token = localStorage.getItem("token");
  const { token } = useContext(AuthContext);

  const loadHotels = async ({
    price,
    ratings,
    sort,
    type,
  }: {
    price?: [number, number];
    ratings?: [number, number];
    sort?: string;
    type?: string;
  }) => {
    const hotels = await getHotels({ price, ratings, sort, type });
    setHotels(hotels);
    // setHotels(hotels);
  };

  const loadHotel = async (id: string) => {
    try {
      const hotel = await getHotel(id);
      if (hotel) {
        setCurrentHotel(hotel);
      } else {
      }
    } catch (error) {}
  };

  return (
    <hotelContext.Provider
      value={{
        hotels,
        setLoading,
        currentHotel,
        loadHotel,
        loadHotels,
        params,
        setParams,
      }}
    >
      {children}
    </hotelContext.Provider>
  );
};

export default hotelContext;
