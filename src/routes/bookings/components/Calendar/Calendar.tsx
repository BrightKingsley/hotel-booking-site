import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";

const MyCalendar = ({
  checkIn,
  checkOut,
}: {
  checkIn?: string;
  checkOut?: string;
}) => {
  useEffect(() => {
    const activeDays: NodeList = document.querySelectorAll(
      ".react-calendar__tile--hasActive"
    )!;

    console.log("ACTIVE___>", activeDays);

    activeDays.forEach((day) => {
      // @ts-ignore
      day.style.color = "#fff";
    });

    // @ts-ignore
    activeDays[0].style.backgroundColor = "rgb(132 204 22 / 0.3)";
    // @ts-ignore
    activeDays[1].style.backgroundColor = "rgb(185 28 28 / 0.4)";
  }, []);

  return (
    <div className="xl:flex">
      <div className="w-80 mx-auto">
        {/* {selectedBooking ? ( */}
        {/* <Calendar
                    checkIn={selectedBooking.checkIn}
                    checkOut={selectedBooking.checkOut}
                  /> */}
        <Calendar defaultValue={["2023-7-12", "2023-7-8"]} />
        {/* ) : (
                    <Skeleton />
                  )} */}
      </div>
      <div className="flex justify-between flex-wrap w-full px-2 sm:px-6 xl:px-0 py-4 xl:flex-col xl:w-fit">
        <div className="flex items-center  gap-2 py-2">
          <div className="w-5 h-5 rounded-full bg-lime-500/40"></div>
          <p>Check-In</p>
        </div>
        <div className="flex items-center  gap-2 py-2">
          <div className="w-5 h-5 rounded-full bg-red-700/40"></div>
          <p>Check-Out</p>
        </div>
        <div className="flex items-center  gap-2 py-2">
          <div className="w-5 h-5 rounded-full bg-primary"></div>
          <p>Today</p>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;

//react-calendar__tile react-calendar__tile--active react-calendar__tile--range react-calendar__tile--rangeStart react-calendar__tile--rangeEnd react-calendar__tile--rangeBothEnds react-calendar__month-view__days__day
