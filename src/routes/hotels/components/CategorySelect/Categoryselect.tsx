import {} from "react";
import { Button } from "@/components";
import { FaBreadSlice, FaHome } from "react-icons/fa";
import { IoHardwareChip, IoLaptop } from "react-icons/io5";

export default function CategorySelect({
  type,
  setType,
}: {
  type: string;
  setType: Function;
}) {
  return (
    <div className="grid grid-cols-2 gap-1">
      <div className="rounded-md overflow-clip h-[4.1rem]">
        <Button
          full={true}
          color={type === "house" ? "primary" : "gray"}
          onClick={() => setType("house")}
        >
          <div className="flex flex-col items-center">
            <FaBreadSlice />
            <small>House</small>
          </div>
        </Button>
      </div>
      <div className="rounded-md overflow-clip h-[4.1rem]">
        <Button
          full={true}
          color={type === "apartment" ? "primary" : "gray"}
          onClick={() => setType("apartment")}
        >
          <div className="flex flex-col items-center">
            <FaHome />
            <small>Apartment</small>
          </div>
        </Button>
      </div>
      <div className="rounded-md overflow-clip h-[4.1rem]">
        <Button
          full={true}
          color={type === "commercial" ? "primary" : "gray"}
          onClick={() => setType("commercial")}
        >
          <div className="flex flex-col items-center">
            <IoHardwareChip />
            <small>Commercial</small>
          </div>
        </Button>
      </div>
      <div className="rounded-md overflow-clip h-[4.1rem]">
        <Button
          full={true}
          color={type === "land" ? "primary" : "gray"}
          onClick={() => setType("land")}
        >
          <div className="flex flex-col items-center">
            <IoLaptop />
            <small>Land Plot</small>
          </div>
        </Button>
      </div>
    </div>
  );
}
