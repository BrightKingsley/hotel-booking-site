import { useContext, useEffect, useState } from "react";
import Checkout from "../bookings/components/Checkout/Checkout";
import { Bookmark, Button, Map, Price, Ratings, Spinner } from "@/components";
import { DetailsGallery, BookingForm, RatingsView } from "./components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext, HotelContext, ModalContext } from "@/context";
import {
  FaBeer,
  FaDumbbell,
  FaHotTub,
  FaParking,
  FaPaw,
  FaStar,
  FaSwimmingPool,
  FaWifi,
} from "react-icons/fa";
import { BiMessageAlt, BiRestaurant } from "react-icons/bi";
import { navigateLogin } from "@/utils";

let bookHotelClicked = false;
export default function HotelDetails() {
  // context
  const { user } = useContext(AuthContext);
  const { triggerModal } = useContext(ModalContext);
  const { currentHotel, loadHotel } = useContext(HotelContext);

  // state
  const [showCheckout, setShowCheckout] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  // hooks
  const { id } = useParams();
  const location = useLocation();
  const source = location.state?.source;

  const navigate = useNavigate();

  useEffect(() => {
    console.log("PARAMS", id);
    document.title = "Hotel Booking || Details";
    loadHotel(id);
  }, []);

  useEffect(() => {
    console.log("SOURCE===>", source, bookHotelClicked, currentHotel);
    bookHotelClicked && currentHotel && source && setShowBookingForm(true);
    bookHotelClicked = false;
  }, [currentHotel, source]);

  const handleClickContact = () => {
    if (!user) {
      triggerModal({
        message: "please log in to send a message",
        confirm: () => () =>
          navigateLogin({ navigate, source: `/app/hotels/chat/${id}` }),
        cancel: () => triggerModal,
      });
      return;
    }
    navigate(`/app/hotels/chat/${id}`);
  };

  const handleBookHotel = () => {
    if (!user) {
      triggerModal({
        message: "please log in to send book this hotel",
        confirm: () => () =>
          navigateLogin({ navigate, source: `/app/hotels/${id}` }),
        cancel: () => triggerModal,
      });
      bookHotelClicked = true;
      return;
    }
    handleShowBookingForm();
  };

  const handleShowCheckout = () => {
    showCheckout ? setShowCheckout(false) : setShowCheckout(true);
  };

  const handleShowReviews = () => {
    console.log("SHOWING__REVIEWS", showReviews, showBookingForm);
    !showBookingForm && !showReviews
      ? setShowReviews(true)
      : setShowReviews(false);
  };

  const handleShowBookingForm = () => {
    !showBookingForm && !showReviews
      ? setShowBookingForm(true)
      : setShowBookingForm(false);
  };

  const handleShare = () => {};

  return (
    <>
      <div
        className={
          "relative gridAreas  py-1 grid grid-flow-col p-0 w-screen h-auto sm:h-[calc(100vh-3.7rem)] grid-rows-[17rem,auto,17rem] grid-cols-[repeat(10,minmax(1rem,1fr))] sm:grid-cols-[repeat(16,minmax(1rem,1fr))] sm:grid-rows-[repeat(16,minmax(auto,1fr))] pl-4 detailsPageMinScreen"
        }
      >
        {currentHotel ? (
          <>
            <div className="fixed bottom-32 right-11 ">
              <button
                onClick={() => handleClickContact()}
                title="contact hotel"
                className="relative w-16 h-16 z-20 bg-body shadow-lg shadow-primary/30 text-4xl text-primary flex items-center justify-center rounded-3xl active:scale-90 after:absolute after:w-full after:h-full active:after:bg-primary/30 transition-all duration-200"
              >
                <span>
                  <BiMessageAlt />
                </span>
              </button>
            </div>
            <Checkout
              showCheckout={showCheckout}
              handleShowCheckout={handleShowCheckout}
            />
            {showBookingForm && (
              <BookingForm
                hotel={currentHotel}
                show={showBookingForm}
                handleShowForm={setShowBookingForm}
              />
            )}
            {showReviews && (
              <RatingsView
                hotel={currentHotel}
                show={showReviews}
                handleShowReviews={handleShowReviews}
              />
            )}
            <DetailsGallery hotel={currentHotel} />
            <div className="mt-0 sm:mt-4 w-full overflow-clip  sm:col-start-1 sm:col-end-10 sm:row-start-[10] sm:row-end-[-1] bg-orange- z-10 mapMinScreen border rounded-md">
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
                " relative w-screen flex flex-col items-center gap-1 col-start-1 col-end-[16] pl-0 py-4 pr-4 rounded-t-2xl row-start-1 row-end-[-1] bg-body overflow-auto mt-9 sm:mt-0 sm:w-auto sm:inline-block sm:pl-8 sm:pr-1 sm:col-start-10 sm:col-end-[-1] sm:row-start-1 sm:row-end-[-1] areaElement rightMinScreen"
              }
            >
              <div className={"sm:hidden w-24 h-[6px] rounded-full bg-grey"} />
              <section className={"relative flex flex-col items-start w-full"}>
                <h2 className="font-bold text-2xl">{currentHotel.name}</h2>
                <small className="">{currentHotel.address?.full}</small>
                <div className={"mt-2 w-full pr-2 xl:pr-20"}>
                  <div className="flex justify-between">
                    <Price price={currentHotel.price ?? null} />
                    <div className="gap-1 flex items-center">
                      <Ratings
                        rating={
                          currentHotel?.rating ? currentHotel?.rating / 2 : 10
                        }
                      />
                      <button
                        onClick={() => handleShowReviews()}
                        className="bg-primary/30 px-[5px] rounded"
                      >
                        <small>View Reviews</small>
                      </button>
                    </div>
                  </div>
                  <div className={"flex items-center space-x-4 py-1"}>
                    {/* NOTE */}
                    <Button
                      onClick={() => {
                        handleBookHotel();
                      }}
                    >
                      Book Hotel
                    </Button>
                    <Button
                      color={"gray"}
                      onClick={() => {
                        handleClickContact();
                      }}
                    >
                      Contact
                    </Button>

                    <span className={"cursor-pointer flex items-center"}>
                      <Bookmark hotelId={currentHotel.name ?? ""} />
                    </span>
                  </div>
                </div>
              </section>
              <section className={"text-start"}>
                <h2 className="font-bold text-lg ">Overview</h2>
                <p>{currentHotel.description}</p>
              </section>
              <section className={"pb-4 w-full"}>
                <h2 className="mb-3 text-lg font-bold">
                  Hotel Information & Features
                </h2>
                <div className={"grid grid-cols-3 gap-2"}>
                  <div className="flex gap-2 items-center">
                    <span className="bg-primary/10 p-2 flex items-center justify-center rounded-md">
                      <FaPaw />
                    </span>
                    <div>
                      <small>Pets allowed</small>
                      {/* <small>{currentHotel.type}</small> */}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-primary/10 p-2 flex items-center justify-center rounded-md">
                      <FaSwimmingPool />
                    </span>
                    <div>
                      <small>Pool</small>
                      {/* <small>{currentHotel.amenities.pool}</small> */}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-primary/10 p-2 flex items-center justify-center rounded-md">
                      <FaWifi />
                    </span>
                    <div>
                      <small>wifi</small>
                      {/* <small>{currentHotel.amenities.wifi}</small> */}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-primary/10 p-2 flex items-center justify-center rounded-md">
                      <FaParking />
                    </span>
                    <div>
                      <small>Parking</small>
                      {/* <small>{currentHotel.amenities.parking}</small> */}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-primary/10 p-2 flex items-center justify-center rounded-md">
                      <FaPaw />
                    </span>
                    <div>
                      <small>Pets</small>
                      {/* <small>{currentHotel.amenities.pets}</small> */}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-primary/10 p-2 flex items-center justify-center rounded-md">
                      <FaDumbbell />
                    </span>
                    <div>
                      <small>gym</small>
                      {/* <small>{currentHotel.amenities.gym}</small> */}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-primary/10 p-2 flex items-center justify-center rounded-md">
                      <FaBeer />
                    </span>
                    <div>
                      <small>hotel bar</small>
                      {/* <small>{currentHotel.amenities.hotelBar}</small> */}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-primary/10 p-2 flex items-center justify-center rounded-md">
                      <BiRestaurant />
                    </span>
                    <div>
                      <small>restaurant</small>
                      {/* <small>{currentHotel.amenities.restaurant}</small> */}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-primary/10 p-2 flex items-center justify-center rounded-md">
                      <FaHotTub />
                    </span>
                    <div>
                      <small>spa</small>
                      {/* <small>{currentHotel.amenities.spa}</small> */}
                    </div>
                  </div>
                </div>
              </section>
              {/* NOTE */}
              {/* <section className={""}>
            <div>
              <p>This is an AD</p>
            </div>
          </section> */}
            </div>
          </>
        ) : (
          <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center">
            <Spinner color="primary" size="large" />
          </div>
        )}
      </div>
    </>
  );
}
