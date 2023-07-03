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

type IState = Section[];

type IAction = {
  type: "GOTO_SECTION" | "HIDE_SECTION" | "SHOW_SECTION";
  value: number;
};

// const reducer = (state: IState = initialSections, { type, value }: IAction) => {
//   let hotelsCopy = [...initialSections];
//   let stateCopy = [...state];
//   switch (type) {
//     case "GOTO_SECTION":
//       if (value >= 0) {
//         hotelsCopy[value] = {
//           ...hotelsCopy[value],
//           inView: true,
//         };
//         return hotelsCopy;
//       }
//     case "HIDE_SECTION":
//       if (value >= 0) {
//         stateCopy[value] = {
//           ...stateCopy[value],
//           hidden: true,
//         };
//         return stateCopy;
//       }

//     case "SHOW_SECTION":
//       if (value >= 0) {
//         stateCopy[value] = {
//           ...stateCopy[value],
//           hidden: false,
//         };
//         return stateCopy;
//       }

//     default:
//       console.log("DEFAULT");
//       return state;
//   }
// };

export default function Sidebar({
  bookings,
  handleShowSidebar,
}: {
  bookings: string[] | null;
  handleShowSidebar: Function;
}) {
  const [openTab, setOpenaTab] = useState(true);
  const [hotels, setHotels] = useState<Hotel[] | []>([]);

  console.log("bookings", bookings);

  useEffect(() => {
    bookings?.forEach(async (booking) => {
      const hotel = await getHotel(booking ? booking : "");
      console.log("hotel", hotel);
      setHotels([...hotels, hotel]);
    });
  }, []);
  // const [hotels, dispatch] = useReducer<Reducer<IState, IAction>, IState>(
  //   reducer,
  //   initialSections,
  //   () => initialSections
  // );

  return (
    true && (
      <Media queries={{ small: { maxWidth: 576 } }}>
        {(matches) => (
          <AnimatePresence>
            {openTab && (
              <div className="w-full h-fit sm:h-full bg-body shadow-lg z-50 flex-1 overflow-auto ">
                <div className="relative  w-full h-full px-2 py-10 ">
                  <ul className="">
                    {hotels?.map((hotel, i) => (
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
                    ))}
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
