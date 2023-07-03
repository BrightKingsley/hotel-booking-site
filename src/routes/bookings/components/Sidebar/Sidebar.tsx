import { useContext, useState, useEffect, useReducer, Reducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Button } from "@/components";
import Media from "react-media";
import { Booking, Hotel } from "@/models";
import { getHotels } from "@/utils";
import { getHotel } from "@/utils";

type Section = {
  path: string;
  name: string;
  inView: boolean;
  hidden: boolean;
};


export default function Sidebar({
  bookings,
  handleShowSidebar,
}: {
  bookings: string[] | null;
  handleShowSidebar: Function;
}) {
  const [openTab, setOpenaTab] = useState(true);
  const [hotels, setHotels] = useState<any>([]);

  console.log("bookings", bookings);

  useEffect(() => {
    const promises:any = [];
    bookings?.forEach((booking) => {
      const hotel = getHotel(booking ? booking : "");
      promises.push(hotel)
    });
      setHotels(Promise.all(promises));
  }, [bookings]);
 

  return (
    true && (
      <Media queries={{ small: { maxWidth: 576 } }}>
        {(matches) => (
          <AnimatePresence>
            {openTab && (
              <div className="w-full h-fit sm:h-full pt-3 sm:pt-0 bg-body shadow-lg z-50 flex-1 overflow-auto ">
                <div className="relative  w-full h-full px-2 py-10 ">
                  <ul className="">
                    {hotels && hotels.length > 0 ? hotels?.map((hotel:any, i:any) => (
                      <li
                        key={hotel?.id}
                        className={`w-full flex relative items-center  h-full border-b-2  after:absolute after:inset-0 after:mx-auto after:w-0 after:h-[2px] after:top-[100%] after:bg-primary hover:after:w-full after:transition-all after:duration-300 after:ease-out transition-all duration-500 hotelList `}
                      >
                        <NavLink
                          to={`/app/hotels/bookings/${hotel?.id}`}
                          className="w-full h-full pt-4 "
                          onClick={() => {
                            matches.small && handleShowSidebar(false);
                          }}
                        >
                          {hotel?.name}
                        </NavLink>
                      </li>
                    )):<></>}
                  </ul>
                  {/* <div className="mt-4">
                  <Button full={true}>save</Button>
                </div> */}
                </div>
              </div>
            )}
          </AnimatePresence>
        )}
      </Media>
    )
  );
}

// ${
//                         hotel && "bg-primary text-white"
//                       }
