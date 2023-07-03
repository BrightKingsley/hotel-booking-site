import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components";

export default function App() {
  return (
    <>
      <Header />
      {/* <div className="flex"> */}
      <main className="h-full pt-[3.7rem]">
        <Outlet />
      </main>
      {/* </div> */}
    </>
  );
}
