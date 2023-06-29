import { Outlet } from "react-router-dom";
import classes from "./authStyles.module.css";

export default function Auth() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}
