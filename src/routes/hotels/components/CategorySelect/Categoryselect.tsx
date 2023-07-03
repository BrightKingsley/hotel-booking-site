import {} from "react";
import { Button } from "@/components";
import { FaDiceFour, FaDiceOne, FaDiceThree, FaDiceTwo } from "react-icons/fa";

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
          <div className="flex flex-col items-center font-[300]">
            <FaDiceOne />
            <small>Single</small>
          </div>
        </Button>
      </div>
      <div className="rounded-md overflow-clip h-[4.1rem]">
        <Button
          full={true}
          color={type === "apartment" ? "primary" : "gray"}
          onClick={() => setType("apartment")}
        >
          <div className="flex flex-col items-center font-[300]">
            <FaDiceTwo />
            <small>Double</small>
          </div>
        </Button>
      </div>
      <div className="rounded-md overflow-clip h-[4.1rem]">
        <Button
          full={true}
          color={type === "commercial" ? "primary" : "gray"}
          onClick={() => setType("commercial")}
        >
          <div className="flex flex-col items-center font-[300]">
            <FaDiceThree />
            <small>Triple</small>
          </div>
        </Button>
      </div>
    </div>
  );
}
