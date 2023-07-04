import React from "react";
import { BiCalendar } from "react-icons/bi";
import Button from "../Button";
import Price from "../Price";
import { useNavigate } from "react-router-dom";
import { Hotel } from "@/models";
import Ratings from "../Ratings";
import Bookmark from "../Bookmark";

export default function Hotel({ hotel }: { hotel: Hotel }) {
  const navigate = useNavigate();
  return (
    <div className="relative space-y-2 px-2 py-2 w-full sm:w-[19.1rem] rounded-lg bg-body flex flex-col h-72 justify-between">
      <div
        className={`relative overflow-clip mx-auto rounded-md w-full g-green-400 flex-1 bg-cover bg-center`}
      >
        <div className="absolute z-[1] top-3 right-3 bg-body rounded-md">
          <Bookmark hotelId={hotel?.id ?? ""} />
        </div>
        <img
          src={hotel?.images && hotel?.images[0]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col px-2 space-y-3 ">
        <div className="flex justify-between gap-4 items-center">
          <p className="text-gray-600 font-bold">{hotel?.name}</p>
          <div className="text-gray-600">
            <Price price={hotel?.price ? hotel.price : null} />{" "}
            <div>
              <Ratings rating={hotel?.rating ? hotel?.rating / 2 : 10} />
            </div>
          </div>
        </div>

        <Button
          onClick={() => navigate("/app/hotels/" + hotel?.id)}
          full={true}
        >
          View Hotel
        </Button>
      </div>
    </div>
  );
}
