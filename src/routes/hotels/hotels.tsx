import { useContext, useEffect, useState } from "react";
import {
  Hotel,
  Dropdown,
  Increment,
  Overlay,
  Spinner,
  Map,
  Input,
} from "@/components";
import { useButtonStyle } from "@/hooks/";
import { AuthContext, HotelContext, ModalContext } from "@/context";
import { useRef } from "react";
import { FilterMenu } from "./components";
import { BiGridHorizontal, BiMenu, BiMessageAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { navigateLogin } from "@/utils";
import { Hotel as HotelType } from "@/models";

export default function Hotels() {
  //context
  const { triggerModal } = useContext(ModalContext);
  const { user } = useContext(AuthContext);
  const { hotels, loadHotels } = useContext(HotelContext);

  //hooks
  const btnStyle = useButtonStyle({ full: true, text: "xs" });
  const dataRef = useRef();
  const navigate = useNavigate();

  //state
  const [showNav, setShowNav] = useState(true);
  const [hovered, setHovered] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setsortBy] = useState("name");

  useEffect(() => {
    !hovered && hotels && setHovered(hotels[0]);
  }, [hotels]);

  useEffect(() => {
    document.title = "Hotel Haven || All";
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
      loadHotels({});
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // @ts-ignore
  const submithandler = (e) => {
    e.preventDefault();

    // @ts-ignore
    handleSubmit(dataRef.current.value);
    // @ts-ignore
    dataRef.current.value = "";
  };

  const handleMessage = () => {
    if (!user) {
      triggerModal({
        message: "please log in to send a message",
        confirm: () => () =>
          navigateLogin({ navigate, source: `/app/hotels/chat}` }),
        cancel: () => triggerModal,
      });
      return;
    }
    navigate(`/app/hotels/chat`);
  };

  const handleFilter = (filters: {
    price: [number, number];
    ratings: [number, number];
    type: string;
  }) => {
    console.log(filters);
    loadHotels(filters);
  };

  //h-[calc(100vh-3.8rem)]

  return (
    <div className="flex h-full w-full">
      {/* <button
        onClick={() => handleMessage()}
        title="contact hotel"
        className="fixed w-16 h-16 z-20 bg-body shadow-lg shadow-primary/30 bottom-32 right-11 text-4xl text-primary flex items-center justify-center rounded-3xl active:scale-90 active:bg-primary/30 transition-all duration-200"
      >
        <span>
          <BiMessageAlt />
        </span>
      </button> */}
      <div className="">
        <FilterMenu
          handleShowNav={setShowNav}
          showNav={showNav}
          handleFilters={handleFilter}
        />
      </div>
      <div className="h-[calc(100%-4rem)]">
        <div className="fixed sm:static sm:bg-grey top-16 z-10 w-full flex justify-between items-center py-1 px-2">
          <span
            onClick={() => setShowNav(true)}
            className="sm:hidden text-2xl cursor-pointer bg-body p-2 rounded-md"
          >
            <BiMenu />
          </span>
          <div className="w-32 z-20 ml-auto">
            {/* @ts-ignore */}
            <Input
              placeholder="sort"
              selected={sortBy}
              getSelected={setsortBy}
              type="select"
              options={[
                { label: "name", value: "name" },
                { label: "type", value: "type" },
                { label: "date", value: "date" },
              ]}
            />
          </div>
        </div>

        {hotels && hotels.length > 0 && !loading ? (
          <div className="px-2 w-full flex flex-col md:grid overflow-y-auto h-full md:grid-cols-2 md:w-fit py-2 gap-4 shrink-0 bg-grey">
            {showNav && (
              // <div
              //   className={`fixed h-full w-full bg-primary/60 cursor-pointer top-0 left-0 flex items-center justify-center backdrop-blur-sm z-10`}
              // />
              <div className="z-10 sm:hidden fixed">
                <Overlay
                  show={showNav}
                  disableOnClick={true}
                  handleShowOverlay={setShowNav}
                />
              </div>
            )}

            {hotels.map((hotel, i) => {
              return (
                <div
                  onMouseOver={() => setHovered(hotel)}
                  key={hotel?.images && hotel?.images[0]}
                  className=""
                >
                  <Hotel hotel={hotel} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="sm:fixed top-0 right-0 h-full w-[100vw] sm:w-[80%] flex items-center justify-center">
            <Spinner size={"large"} color={"primary"} />
          </div>
        )}
      </div>
      {hotels && (
        <div className="w-full flex-1 z-10 hidden md:block">
          <Map hotel={hovered} page="hotels" zoom={16} />
        </div>
      )}
    </div>
  );
}
