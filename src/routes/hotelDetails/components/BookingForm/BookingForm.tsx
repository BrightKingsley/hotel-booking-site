import { useContext, useState } from "react";
import {
  AnimateInOut,
  Button,
  Carousel,
  Close,
  Overlay,
  Spinner,
} from "@/components";
import { bookHotel } from "@/utils";
import { AuthContext, NotificationContext } from "@/context";
import { Link } from "react-router-dom";
import { useButtonStyle } from "@/hooks";
import { Hotel } from "@/models";
import DetailsModal from "../DetailsModal/DetailsModal";

const inputStyles = `focus:outline-primary p-2 rounded-md w-full bg-primary/10 focus:bg-white transition-all duration-200 `;

export default function BookingForm({
  hotel,
  show,
  handleShowForm,
}: {
  hotel: Hotel;
  show: boolean;
  handleShowForm: Function;
}) {
  const { user } = useContext(AuthContext);
  const { triggerNotification } = useContext(NotificationContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const hotelImgs = [];
  for (let i = 0; i <= 6; i++) {
    if (hotel) {
      hotelImgs.push(hotel.images ? hotel.images[i] : "");
    }
  }

  const disabled =
    loading ||
    firstname.length < 1 ||
    lastname.length < 1 ||
    email.length < 1 ||
    contact.length < 8 ||
    checkIn.length < 1 ||
    checkOut.length < 1;

  const btnStyles = useButtonStyle({ disabled, full: true });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    if (!hotel?.price) return;
    const result : "success" | "exists" | null = await bookHotel({
      uid: (user && user.uid) || "",
      checkIn,
      hotelId: hotel?.id || "",
      checkOut,
      contact,
      email,
      firstname,
      lastname,
      price: hotel?.price,
      hotel: hotel?.name || "",
      type: hotel.type || "single",
    });

    if (result == "exists") {
      setLoading(false);
      handleShowForm(false); 
      return triggerNotification(<Link to={`/app/hotels/bookings/${hotel?.id}`}>
        <div className="w-full h-full">
          You have already booked this hotel. Click to view.
        </div>
      </Link>);
    } else if(result == "success"){
     triggerNotification(
      <Link to={`/app/hotels/bookings/${hotel?.id}`}>
        <div className="w-full h-full">
          Hotel booked successfully click to view boking details
        </div>
      </Link>
    );
    setLoading(false);
    handleShowForm(false); 
    }else{
       setLoading(false);
      return triggerNotification("Unable to book this hotel, please try again");
    }
  };

  return (
    <DetailsModal show={show} handleShowModal={handleShowForm}>
      <div className="fixed right-4 z-20 overflow-clip">
        <Close close={handleShowForm} />
      </div>
      <div className="space-y-2">
        {/* <div className="w-full h-80 rounded-md overflow-clip">
            <img src={hotel?.images[0]} alt="hotel" />
          </div> */}

        <Carousel images={hotelImgs} height="h-64" />

        <p className="text-center">Make a reservation at {hotel?.name}.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col justify-center space-y-2 p-4"
      >
        <h2 className="mx-auto font-bold ">Booking Form</h2>
        <div className="relative flex flex-col items-center w-full">
          <small
            className={`self-start ${
              firstname.length > 0 ? "inline" : "hidden"
            } transition-all duration-200 text-primary`}
          >
            firstname
          </small>
          <input
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
              (prev: any) => {
                return { ...prev, firstname: "" };
              };
            }}
            name="firstname"
            type="text"
            placeholder="firstname"
            className={`${inputStyles}`}
          />
        </div>
        <div className="relative flex flex-col items-center w-full">
          <small
            className={`self-start ${
              lastname.length > 0 ? "inline" : "hidden"
            } transition-all duration-200 text-primary`}
          >
            lastname
          </small>
          <input
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
              (prev: any) => {
                return { ...prev, lastname: "" };
              };
            }}
            name="lastname"
            type="text"
            placeholder="lastname"
            className={`${inputStyles}`}
          />
        </div>

        <div className="relative flex flex-col items-center w-full">
          <small
            className={`self-start ${
              email.length > 0 ? "inline" : "hidden"
            } transition-all duration-200 text-primary`}
          >
            email: <small className="text-gray-600"> include '@'</small>
          </small>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              (prev: any) => {
                return { ...prev, email: "" };
              };
            }}
            name="email"
            type="email"
            placeholder="email"
            className={`${inputStyles}`}
          />
        </div>
        <div className="relative flex flex-col items-center w-full">
          <small
            className={`self-start ${
              contact.length > 0 ? "inline-block" : "hidden"
            } transition-all duration-200 text-primary`}
          >
            phone number
          </small>
          <input
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              (prev: any) => {
                return { ...prev, contact: "" };
              };
            }}
            name="Phone number"
            min={8}
            type="text"
            placeholder="Phone number"
            className={inputStyles}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="relative flex flex-col items-center w-full">
            <small
              className={`self-start ${
                contact.length > 0 ? "inline-block" : "hidden"
              } transition-all duration-200 text-primary`}
            >
              check-in
            </small>
            <input
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                (prev: any) => {
                  return { ...prev, checkIn: "" };
                };
              }}
              name="check-in date"
              min={8}
              type="date"
              placeholder="check-in date"
              className={inputStyles}
            />
          </div>
          <div className="relative flex flex-col items-center w-full">
            <small
              className={`self-start ${
                contact.length > 0 ? "inline-block" : "hidden"
              } transition-all duration-200 text-primary`}
            >
              check-out
            </small>
            <input
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
                (prev: any) => {
                  return { ...prev, checkOut: "" };
                };
              }}
              name="check-out date"
              min={8}
              type="date"
              placeholder="check-out date"
              className={inputStyles}
            />
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div
            className={`mx-auto w-[80%] rounded-full overflow-clip h-12 ${
              !disabled && "active:scale-95"
            } ${!disabled && "wobble"} transition-all duration-150 ease-in-out`}
          >
            <Button disabled={disabled} loading={loading} full={true}>
              Book Hotel
            </Button>
          </div>
        </div>
      </form>
    </DetailsModal>
  );
}
