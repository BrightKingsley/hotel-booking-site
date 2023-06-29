import React from "react";
import { motion } from "framer-motion";

type MarkerProps = {
  children: React.ReactNode;
};

const MapMarker = ({ children }: MarkerProps) => {
  return (
    <motion.div
      animate={{ y: -10 }}
      className="whitespace-nowrap font-bold text-[0.6rem] p-2 w-auto   bg-white shadow-md rounded-md top-[-20rem] -left-1/2"
    >
      <p>{children}</p>
    </motion.div>
  );
};

export default MapMarker;
//before:inset-0 before:m-auto z-10
