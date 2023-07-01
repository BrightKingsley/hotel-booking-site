import { Overlay } from "@/components";
import React from "react";
import { Message, Sidebar } from "./components";
import Chat from "./components/Chat";

export default function Contact() {
  return (
    <>
      {/* <div className="fixed z-10">
        <Overlay show={true} />
      </div> */}
      <div className="flex items-center justify-center w-full h-full">
        <Overlay show={true} />

        <div className="flex w-[70%] h-[90%] rounded-xl overflow-clip bg-white">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </>
  );
}
