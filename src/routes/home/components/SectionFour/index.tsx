import React from "react";
import Globe from "./assets/globe";
import MapMarker from "./MapMarker";
import { motion } from "framer-motion";

const SectionFour = () => {
  return (
    <motion.div className="md:mx-16 mx-auto py-24">
      <div className="text-center  mx-auto sm:max-w-4xl">
        <motion.h2
          initial={{ height: 0 }}
          whileInView={{ height: "auto" }}
          className="font-bold text-[2.3rem] sm:text-5xl"
        >
          Wherever You are, you will definitely get a place
        </motion.h2>
        <p className="md:max-w-7xl my-12 ">
          Wherever you want to live, dont hesitate to contact us, we will find
          the best <br /> housing even to the ends of the world
        </p>
      </div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ amount: 0.2 }}
        transition={{ type: "keyframes" }}
        className="flex relative items-center"
      >
        <div className="translate-x-4 -translate-y-10 absolute md:left-20  md:-translate-y-24 lg:-translate-y-32">
          <MapMarker>North America</MapMarker>
        </div>
        <div className="right-4 -translate-y-20 md:-translate-y-36 lg:-translate-y-44 absolute md:right-56 md:translate-x-32">
          <MapMarker>Europe/Asia</MapMarker>
        </div>
        <div className="translate-x-32 bottom-0 md:translate-x-96   absolute md:bottom-16 lg:bottom-32 lg:translate-x-[35rem] ">
          <MapMarker>Africa</MapMarker>
        </div>
        <Globe />
      </motion.div>
    </motion.div>
  );
};

export default SectionFour;
