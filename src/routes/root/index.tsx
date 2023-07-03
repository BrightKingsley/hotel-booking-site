import React from "react";
import { Outlet } from "react-router-dom";
import { Modal, MouseTracker, Notification } from "@/components";

export default function Root() {
  return (
    <>
      <Modal />
      <Notification />
      <MouseTracker />
      <Outlet />
    </>
  );
}
