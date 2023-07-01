import { useContext, useState, useEffect, useReducer, Reducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Button } from "@/components";

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
  hotels,
}: {
  hotels: (string | undefined)[];
}) {
  const [openTab, setOpenaTab] = useState(true);
  const [hideSection, setHideSection] = useState(false);

  // const [hotels, dispatch] = useReducer<Reducer<IState, IAction>, IState>(
  //   reducer,
  //   initialSections,
  //   () => initialSections
  // );

  return (
    true && (
      <>
        {/* <motion.div
          drag="x"
          // _dragY={}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={() => setOpenaTab(true)}
          whileDrag={{ scaleY: 2 }}
          onClick={() => setOpenaTab(true)}
          className="fixed top-1/3 left-[-49rem] cursor-pointer bg-primary rounded-r-md w-[50rem] h-72 md:h-52 z-50"
        /> */}
        <AnimatePresence>
          {openTab && (
            <div
              // animate={{ x: 0, opacity: 1 }}
              // exit={{ x: "-100%", opacity: 0 }}
              className="w-full h-full bg-body shadow-lg z-50  "
            >
              <div className="relative  w-full h-full px-2 py-10 ">
                <ul className="">
                  {hotels.map((hotel, i) => (
                    <li
                      key={hotel}
                      className={`w-full flex relative items-center  h-full border-b-2  after:absolute after:inset-0 after:mx-auto after:w-0 after:h-[2px] after:top-[100%] after:bg-primary hover:after:w-full after:transition-all after:duration-300 after:ease-out transition-all duration-500 hotelList `}
                    >
                      <NavLink
                        to={`/app/hotels/bookings/${hotel}`}
                        className="w-full h-full pt-4 "
                        onClick={() => {}}
                      >
                        {hotel}
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
      </>
    )
  );
}

// ${
//                         hotel && "bg-primary text-white"
//                       }
