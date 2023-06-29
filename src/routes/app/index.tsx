import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components";
import { Navbar } from "../root/components";

export default function App() {
  return (
    <>
      <Header />
      {/* <div className="flex"> */}
      <main className="h-full">
        <Outlet />
      </main>
      {/* </div> */}
    </>
  );
}
