import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@/components";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/app/hotels");
  });
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
