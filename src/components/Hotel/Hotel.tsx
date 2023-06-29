import React from "react";
import { BiCalendar } from "react-icons/bi";
import Button from "../Button";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

export default function Hotel({ hotel }: { hotel: Hotel }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-2 px-2 py-4 w-[19.1rem] rounded-lg bg-body flex flex-col h-72 justify-between">
      <div
        className={`relative overflow-clip mx-auto rounded-md w-full g-green-400 flex-1 ${
          hotel.images[0] === "spin" ? "bg-ticketSpin" : "bg-ticket777"
        }  bg-cover bg-center`}
      >
        <div className="absolute  w-full top-1/2 rounded-full items-center mx-auto text-center ">
          <p className="uppercase spinWheelText">Show more</p>
        </div>
        <img
          src={hotel.images[0]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col px-2 space-y-3 ">
        <div className="flex justify-between gap-4 items-center">
          <p className="text-gray-400">
            Number of players:{" "}
            <span className="font-bold text-gray-500">
              {hotel.location.lat || <Skeleton />}
            </span>
          </p>
          <p className="text-gray-400">
            <span className="w-4 h-4 inline-block mr-1">
              <BiCalendar />
            </span>{" "}
            Date: <span className="font-bold text-gray-500">22/02/23</span>
          </p>
        </div>

        <Button
          onClick={() => navigate("/app/hotels/" + hotel.name)}
          full={true}
        >
          View Hotel
        </Button>
      </div>
    </div>
  );
}
