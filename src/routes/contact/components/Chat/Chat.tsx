import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/context";
import { Girl } from "@/assets";
import MsgInput from "../MsgInput";
import Messages from "../Messages";
import { useParams } from "react-router-dom";
import { getHotels } from "@/utils";

export default function Chat() {
  const { data } = useContext(ChatContext);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  console.log("data", data);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const hotels = await getHotels();
      const active = hotels
        .map((hotel) => hotel.name)
        .find((name) => name === id);
      active && setActiveChat(active);
    })();
  }, []);

  return (
    <div className="flex flex-[3] flex-col  w-full h-full">
      <div className="h-16 flex items-center px-2 bg-gradient-primary">
        {/* <span>{data.user?.displayName}</span> */}
        <p className="text-white">{activeChat}</p>
        <div className="">
          {/* <img src={Girl} alt="" />
          <img src={Girl} alt="" />
        <img src={Girl} alt="" /> */}
        </div>
      </div>
      <Messages />
      <MsgInput />
    </div>
  );
}
