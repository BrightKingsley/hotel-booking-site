import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components";
import { Navbar } from "../root/components";

export default function App() {
  // useEffect(() => {
  //   const body = document.querySelector("body")!;
  //   body.style.height = "100vh";
  // });

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
