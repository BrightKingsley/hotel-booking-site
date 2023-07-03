import { AnimateInOut, Overlay } from "@/components";
import React from "react";
import { DetailsFormType } from "./types";

export default function DetailsModal({
  children,
  show,
  handleShowModal,
}: DetailsFormType) {
  return (
    <div className="z-20 fixed w-screen h-screen top-0 left-0 flex items-center justify-center">
      <Overlay
        show={show}
        handleShowOverlay={handleShowModal}
        disableOnClick={true}
      />
      <AnimateInOut
        init={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        out={{ opacity: 0, y: 100 }}
        show={show}
        drag="y"
        handleDragEnd={handleShowModal}
        className=" relative overflow-auto w-[36rem] h-[90%] mt-[3.7rem] rounded-md z-10 bg-body p-4 mx-3"
      >
        {children}
      </AnimateInOut>
    </div>
  );
}
