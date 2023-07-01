import { useEffect, useState } from "react";
import { AnimateInOut, Carousel } from "@/components";
import { Calendar, Sidebar } from "./components";
import { useParams } from "react-router-dom";

const booking = {
  uid: "uid",
  firstname: "firstname",
  lastname: "lastname",
  contact: "contact",
  hotel: { name: "name", images: ["img-1", "img-2", "img-3"] },
  checkIn: "checkin",
  checkOut: "checkout",
  total: 1000,
  vat: "2000",
};

const bookings: Booking[] = [];

for (let i = 0; i <= 5; i++) {
  const newBooking = { ...booking, hotel: { name: `name ${i + 1}` } };
  bookings.push(newBooking);
}

export default function Bookings() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const currentBooking = bookings.find(
      (booking) => booking.hotel?.name === id
    );
    setSelectedBooking(currentBooking !== undefined ? currentBooking : null);
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className="400 w-[20%]">
        <Sidebar hotels={bookings.map((booking) => booking.hotel?.name)} />
        {/* {bookings.map((booking) => (
          <p>{booking.hotel}</p>
        ))} */}
      </div>
      <div className="bg-grey w-[40%] flex items-center justify-center">
        <AnimateInOut
          init={{ x: 400, scale: 0.5 }}
          animate={{ x: 0, scale: 1 }}
          out={{ x: 400, scale: 0.5 }}
          show={true}
          className="w-[80%] h-[80%] bg-body rounded-lg mx-auto"
        >
          <div className="text-center p-3 space-y-4">
            <div className="">
              <Carousel
                height="h-52"
                images={
                  selectedBooking?.hotel?.images != undefined
                    ? selectedBooking?.hotel?.images
                    : [""]
                }
              />
            </div>
            <div className="">
              <p>
                <span>fullname: </span>
                {booking.firstname} {booking.lastname}
              </p>
            </div>
            <div className="">
              <p>
                <span>fullname: </span>
                {booking.firstname} {booking.lastname}
              </p>
            </div>
            <div className="">
              <p>
                <span>fullname: </span>
                {booking.firstname} {booking.lastname}
              </p>
            </div>
            <div className="">
              <p>
                <span>fullname: </span>
                {booking.firstname} {booking.lastname}
              </p>
            </div>
            <div className="">
              <p>
                <span>fullname: </span>
                {booking.firstname} {booking.lastname}
              </p>
            </div>
          </div>
        </AnimateInOut>
      </div>
      <div className="w-[40%]">
        <div className="w-fit mx-auto">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
