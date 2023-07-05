import { useContext, useEffect, useState } from "react";
import { AnimateInOut, Button, Overlay, Spinner } from "@/components";
import { Calendar, Sidebar } from "./components";
import { useNavigate, useParams } from "react-router-dom";
import { getBookings } from "@/utils";
import { Zzz } from "@/assets";
import { Booking } from "@/models";
import { BiMenu } from "react-icons/bi";
import Media from "react-media";
import Skeleton from "react-loading-skeleton";
import { AuthContext, ModalContext, NotificationContext } from "@/context";
import { usePaystackPayment } from "react-paystack";

const booking = {
  uid: "uid",
  firstname: "firstname",
  lastname: "lastname",
  contact: "contact",
  hotel: "name",
  checkIn: "checkin",
  checkOut: "checkout",
  price: 850,
  total: 1000,
};

export default function Bookings() {
  useEffect(() => {
    document.title = "Hotel Haven || My Bookings";
  }, []);
  const { user } = useContext(AuthContext);
  const { triggerNotification } = useContext(NotificationContext);

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPayment, setLoadingPayment] = useState<boolean>(false);
  const [initiatePayment, setInitiatePayment] = useState(false);

  const [bookings, setBookings] = useState<Booking[] | null>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const onSuccess = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (reference.status === "success") {
      triggerNotification("payment successful");
    } else {
      triggerNotification("payment failed");
    }
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    triggerNotification("checkout closed");
  };

  const [config, setConfig] = useState({
    reference: new Date().getTime().toString(),
    email: "",
    amount: (selectedBooking?.total && selectedBooking?.total * 100) || 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_bd2ebc6e0df8b4fd0bab4bce8c082598afa44ed9",
  });

  const initializePayment = usePaystackPayment(config);

  const navigateLogin = () => {
    navigate("/auth/login");
  };

  const handleInitiatePayment = async () => {
    initiatePayment || loadingPayment
      ? setInitiatePayment(false)
      : setInitiatePayment(true);
    initiatePayment || loadingPayment
      ? setLoadingPayment(false)
      : setLoadingPayment(true);
  };

  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      reference: new Date().getTime().toString(),
      email: user?.email || "",
      amount: (selectedBooking?.total && selectedBooking?.total * 100) || 0,
    }));
  }, [selectedBooking?.total]);

  useEffect(() => {
    console.log("ID", id);
    (async () => {
      setLoading(true);
      const bookingDocuments: any = await getBookings();
      if (!bookingDocuments) return;
      setBookings(bookingDocuments.filter((doc:any)=>doc?.uid === user?.uid));
      setLoading(false);
    })();
  }, []);
  
  useEffect(() => {
    if (!id || !bookings || bookings.length < 1) return;
    const currentBooking = bookings.find((booking) => booking.hotelId === id);
    setSelectedBooking(currentBooking ? currentBooking : null);
  }, [bookings?.length,id]);

  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     const bookingDocuments = await getBookings();
  //     if (!bookingDocuments) return;
  //     setBookings(bookingDocuments);
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Media queries={{ small: { maxWidth: 576 } }}>
      {(matches) => {
        return (
          <>
            <div className="flex w-full h-full z-30">
              {matches.small ? (
                bookings &&
                bookings.length > 0 && (
                  <div
                    className={`fixed h-full flex flex-col ${
                      showSidebar ? "translate-x-0" : "-translate-x-full"
                    } sm:static top-0 left-0 z-40 400 bg-body  w-80 sm:w-[20%] transition-all duration-200 pt-6 sm:pt-0`}
                  >
                    {!loading && bookings && bookings.length > 0 ? (
                      <>
                        <Sidebar
                          handleShowSidebar={setShowSidebar}
                          bookings={
                            bookings && bookings.length > 0
                              ? bookings.map((booking) => booking.hotelId)
                              : []
                          }
                        />
                        <div className="sm:hidden w-fit mx-auto z-20 flex-1">
                          <Calendar
                            checkIn={selectedBooking?.checkIn || ""}
                            checkOut={selectedBooking?.checkOut || ""}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Spinner color="primary" size="medium" />
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div
                  className={`fixed h-full flex flex-col ${
                    showSidebar ? "translate-x-0" : "-translate-x-full"
                  } sm:static top-0 left-0 z-40 400 bg-body  w-80 sm:w-[20%] transition-all duration-200 pt-6 sm:pt-0`}
                >
                  {!loading ? (
                    <>
                      <Sidebar
                        handleShowSidebar={setShowSidebar}
                        bookings={
                          bookings && bookings.length > 0 ? bookings.map((booking) => booking.hotelId)
                            : []
                        }
                      />
                      {bookings && bookings?.length > 0 && (
                        <div className="sm:hidden w-fit mx-auto z-20 flex-1">
                          <Calendar
                            checkIn={selectedBooking?.checkIn || ""}
                            checkOut={selectedBooking?.checkOut || ""}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Spinner color="primary" size="medium" />
                    </div>
                  )}
                </div>
              )}

              <div className="bg-grey w-full sm:w-[40%] flex items-center justify-center">
                {bookings && bookings.length > 0 && (
                  <>
                    <span
                      onClick={() => setShowSidebar((prev) => !prev)}
                      className={`text-3xl sm:hidden fixed top-16 left-4 cursor-pointer active:scale-75 transition-all duration-200 z-50 rounded-full p-1 bg-grey ${
                        showSidebar && "left-auto right-3"
                      }`}
                    >
                      <BiMenu />
                    </span>
                    <div className="fixed sm:hidden z-20 top-0 left-0">
                      <Overlay
                        handleShowOverlay={setShowSidebar}
                        show={showSidebar}
                        disableOnClick={true}
                      />
                    </div>
                  </>
                )}
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Spinner color="primary" size="medium" />
                  </div>
                ) : id && selectedBooking ? (
                  <AnimateInOut
                    init={{ x: 400, scale: 0.5 }}
                    animate={{ x: 0, scale: 1 }}
                    out={{ x: 400, scale: 0.5 }}
                    show={true}
                    className="w-[80%] h-[80%] bg-body rounded-lg mx-auto"
                  >
                    <div className="text-left p-3 space-y-4">
                      <div className="">
                        {/* <Carousel
                  height="h-52"
                  images={
                    selectedBooking?.hotelID?.images != undefined
                      ? selectedBooking?.hotelID?.images
                      : [""]
                  }
                /> */}
                      </div>
                       <div className="bg-primary/20 p-2 w-full pl-8 rounded-md h-16">
                        <h2>{selectedBooking?.hotel}</h2>
                        <p>
                          <span>fullname: </span>
                          {selectedBooking?.firstname}{" "}
                          {selectedBooking?.lastname}
                        </p>
                      </div>
                       <div className="bg-primary/20 p-2 w-full pl-8 rounded-md h-16">
                        <p>
                          <span>contact: </span>
                          {selectedBooking?.contact}
                        </p>
                      </div>
                       <div className="bg-primary/20 p-2 w-full pl-8 rounded-md h-16">
                        <p>
                          <span>check-in: </span>
                          {new Date(
                            selectedBooking?.checkIn
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                       <div className="bg-primary/20 p-2 w-full pl-8 rounded-md h-16">
                        <p>
                          <span>check-out: </span>
                          {new Date(
                            selectedBooking?.checkOut
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                       <div className="bg-primary/20 p-2 w-full pl-8 rounded-md h-16">
                        <p>
                          <span>Total (VAT included): </span>₦
                          {selectedBooking?.total}.00
                        </p>
                      </div>

                      <div
                        className={`mx-auto w-[80%] rounded-full overflow-clip h-12 ${
                          !loading && "active:scale-95"
                        } ${
                          !loading && "wobble"
                        } transition-all duration-150 ease-in-out`}
                      >
                        <Button
                          full={true}
                          loading={loadingPayment}
                          disabled={loadingPayment}
                          onClick={() => {
                            // @ts-ignore
                            user && initializePayment(onSuccess, onClose);
                          }}
                        >
                          Confirm Payment
                        </Button>
                      </div>
                    </div>
                  </AnimateInOut>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <div className="space-y-6">
                      <div className="w-40 mx-auto">
                        <img src={Zzz} />
                      </div>
                      <p className="text-xl">
                        {bookings && bookings?.length > 0
                          ? "Click on a booking to show details"
                          : "You have no bookings"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="hidden sm:block w-[40%]">
                {selectedBooking ? (
                  <Calendar
                    checkIn={selectedBooking.checkIn}
                    checkOut={selectedBooking.checkOut}
                  />
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </>
        );
      }}
    </Media>
  );
}
