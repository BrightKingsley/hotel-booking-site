import { useContext, useEffect, useState } from "react";
import {
  Hotel,
  Dropdown,
  Increment,
  Overlay,
  Spinner,
  Map,
} from "@/components";
import { useButtonStyle } from "@/hooks/";
import { HotelContext, ModalContext } from "@/context";
import { useRef } from "react";
import { FilterMenu } from "./components";
import { BiGridHorizontal } from "react-icons/bi";

export default function Hotels() {
  const btnStyle = useButtonStyle({ full: true, text: "xs" });
  const [showNav, setShowNav] = useState(true);

  const { triggerModal } = useContext(ModalContext);
  const { hotels, loadHotels } = useContext(HotelContext);

  const dataRef = useRef();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
      loadHotels();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    console.log("HOTELs:", hotels);
  }, [hotels]);
  // @ts-ignore

  const submithandler = (e) => {
    e.preventDefault();

    // @ts-ignore
    handleSubmit(dataRef.current.value);
    // @ts-ignore
    dataRef.current.value = "";
  };

  return (
    <div className="flex h-[calc(100vh-3.8rem)]">
      <div className="">
        <FilterMenu handleShowNav={setShowNav} showNav={showNav} />
      </div>

      {hotels && hotels.length > 0 ? (
        <div className="px-2 flex flex-col md:grid overflow-y-auto h-[calc(100vh-3.7rem)] md:grid-cols-2 md:w-fit py-2 gap-4 shrink-0 bg-grey">
          {showNav && (
            // <div
            //   className={`fixed h-full w-full bg-primary/60 cursor-pointer top-0 left-0 flex items-center justify-center backdrop-blur-sm z-10`}
            // />
            <div className="z-10 sm:hidden">
              <Overlay
                show={showNav}
                disableOnClick={true}
                handleShowOverlay={setShowNav}
              />
            </div>
          )}
          <div onClick={() => setShowNav(true)} className="sm:hidden">
            <BiGridHorizontal />
          </div>
          {hotels.map((hotel, i) => {
            console.log("HOTEL", hotel);
            return <Hotel hotel={hotel} key={hotel.images[0]} />;
          })}
        </div>
      ) : (
        <div className="h-[calc(100vh-3.7rem)] w-full flex items-center justify-center">
          <Spinner size={"large"} color={"primary"} />
        </div>
      )}
      {hotels && (
        <div className="w-full h-full flex flex-1 z-10">
          <Map hotel={hotels[0]} page="hotels" zoom={14} />
        </div>
      )}
    </div>
  );
}
