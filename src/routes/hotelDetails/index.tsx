import { useContext, useEffect, useState } from "react";
import Checkout from "./Checkout";
import { Bookmark, Button, Header, Map, Price, Spinner } from "@/components";
import DetailsGallery from "./DetailsGallery";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext, HotelContext, ModalContext } from "@/context";
import {
  FaBeer,
  FaDumbbell,
  FaHotTub,
  FaParking,
  FaPaw,
  FaSwimmingPool,
  FaWifi,
} from "react-icons/fa";
import { BiRestaurant } from "react-icons/bi";

export default function HotelDetails() {
  // context
  const { user } = useContext(AuthContext);
  const { triggerModal } = useContext(ModalContext);
  const { currentHotel, loadHotel } = useContext(HotelContext);

  // state
  const [showCheckout, setShowCheckout] = useState(false);

  // hooks
  const { id } = useParams();
  const location = useLocation();

  const source = location.state?.source;

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/auth/login", { state: { source: `/listings/${id}` } });
  };

  useEffect(() => {
    console.log("PARAMS", id);
    document.title = "Raale. || Details";
    loadHotel(id);
  }, []);

  // useEffect(() => {
  //   console.log("SOURCE===>", source);
  //   !tourClicked &&
  //     currentHotel &&
  //     source &&
  //     triggerRently(true, currentHotel);
  //   tourClicked = currentHotel && source;
  // }, [currentHotel, source, triggerRently]);

  // const handleClickRent = () => {
  //   navigate("../message");
  // };
  // const handleClickContact = () => {
  //   navigate("../message");
  // };

  // const handleClickTour = () => {
  //   isAuth
  //     ? triggerRently(true, currentHotel)
  //     : triggerModal(
  //         "You must be logged in to register for self tour. Login now?",
  //         () => navigateLogin,
  //         () => triggerModal
  //       );
  // };

  const handleShowCheckout = () => {
    showCheckout ? setShowCheckout(false) : setShowCheckout(true);
  };

  const handleShare = () => {};

  return currentHotel ? (
    <>
      {/* <Checkout
        showCheckout={showCheckout}
        handleShowCheckout={handleShowCheckout}
      /> */}
      <main
        className={
          "gridAreas pb-1 grid grid-flow-col p-0 pt-16 w-full h-auto sm:h-screen grid-rows-[17rem,auto,17rem] grid-cols-[repeat(10,minmax(1rem,1fr))] sm:grid-cols-[repeat(16,minmax(1rem,1fr))] sm:grid-rows-[repeat(16,minmax(auto,1fr))] pl-4"
        }
      >
        <DetailsGallery hotel={currentHotel} />
        <div className="mt-0 sm:mt-4 w-full overflow-clip  sm:col-start-1 sm:col-end-10 sm:row-start-[10] sm:row-end-[-1] bg-orange- z-10">
          {/* <nav>
            <ul>
              <li>Neighborhood</li>
              <li>Schools</li>
              <li>Markets</li>
              <li>Gyms</li>
              <li>Parks&walkingarea</li>
            </ul>
          </nav> */}
          {Object.values(currentHotel).length > 0 && (
            <Map page="details" hotel={currentHotel} zoom={16} />
          )}
        </div>
        <div
          className={
            "w-full flex sm:w-auto  sm:inline-block flex-col items-center gap-1 col-start-1 col-end-[16] pl-0 py-4 pr-4 rounded-t-2xl relative sm:pl-8 sm:pr-1 overflow-auto sm:col-start-10 sm:col-end-[-1] row-start-1 row-end-[-1] sm:row-start-1 sm:row-end-[-1] areaElement"
          }
        >
          <div className={"sm:hidden w-24 h-[6px] rounded-full bg-grey"} />
          <section className={"relative flex flex-col items-start w-full"}>
            <div className={"absolute top-4 right-4 flex items-center gap-2"}>
              <span className={"cursor-pointer"}>
                <Bookmark hotelId={currentHotel.name} />
              </span>
            </div>

            <h2 className="font-bold text-xl">{currentHotel.name}</h2>
            <small>{currentHotel.address.country}</small>
            <div className={""}>
              <Price price={currentHotel.price} />
              <div className={""}>
                {/* NOTE */}
                <Button
                  onClick={() => {
                    setShowCheckout(true);
                  }}
                >
                  Rent Now
                </Button>
              </div>
            </div>
          </section>
          <section className={"text-start"}>
            <h2>Overview</h2>
            <p>{currentHotel.description}</p>
          </section>
          <section className={""}>
            <h2 className="mb-3">Property Information & Features</h2>
            {/* <div className={""}>
              <div>
                <span>
                  <FaPaw />
                </span>
                <div>
                  <small>Type</small>
                  <small>{currentHotel.type}</small>
                </div>
              </div>
              <div>
                <span>
                  <FaSwimmingPool />
                </span>
                <div>
                  <small>Pool</small>
                  <small>{currentHotel.amenities.pool}</small>
                </div>
              </div>
              <div>
                <span>
                  <FaWifi />
                </span>
                <div>
                  <small>wifi</small>
                  <small>{currentHotel.amenities.wifi}</small>
                </div>
              </div>
              <div>
                <span>
                  <FaParking />
                </span>
                <div>
                  <small>Parking</small>
                  <small>{currentHotel.amenities.parking}</small>
                </div>
              </div>
              <div>
                <span>
                  <FaPaw />
                </span>
                <div>
                  <small>Pets</small>
                  <small>{currentHotel.amenities.pets}</small>
                </div>
              </div>
              <div>
                <span>
                  <FaDumbbell />
                </span>
                <div>
                  <small>gym</small>
                  <small>{currentHotel.amenities.gym}</small>
                </div>
              </div>
              <div>
                <span>
                  <FaBeer />
                </span>
                <div>
                  <small>hotel bar</small>
                  <small>{currentHotel.amenities.hotelBar}</small>
                </div>
              </div>
              <div>
                <span>
                  <BiRestaurant />
                </span>
                <div>
                  <small>restaurant</small>
                  <small>{currentHotel.amenities.restaurant}</small>
                </div>
              </div>
              <div>
                <span>
                  <FaHotTub />
                </span>
                <div>
                  <small>spa</small>
                  <small>{currentHotel.amenities.spa}</small>
                </div>
              </div>
            </div> */}
          </section>
          {/* NOTE */}
          {/* <section className={""}>
            <div>
              <p>This is an AD</p>
            </div>
          </section> */}
        </div>
      </main>
    </>
  ) : (
    <div className="w-full">
      <Spinner color="primary" size="large" />
    </div>
  );
}
