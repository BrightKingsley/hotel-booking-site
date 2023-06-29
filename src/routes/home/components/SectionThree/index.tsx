import React from "react";
import { Card } from "@/components";
import img_1 from "./assets/img-1.jpg";
import img_2 from "./assets/img-2.jpg";
import img_3 from "./assets/img-3.jpg";
import { motion } from "framer-motion";

const SectionThree = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{ type: "keyframes" }}
      viewport={{ amount: 0.8 }}
      className="px-2 md:px-16 pt-12 "
    >
      <div className="flex items-center text-[2.3rem] sm:text-5xl">
        <h2 className="font-bold text-center sm:text-left  scrollbar-none  whitespace-nowrap">
          Featured Property
        </h2>
      </div>
      <div className="w-full  h-94 mt-4 overflow-x-auto flex flex-nowrap justify-center">
        <div className="h-full px-2  overflow-x-auto flex flex-nowrap gap-6 md:mt-16 pb-4 ">
          <div className="w-80 h-full shadow-lg shrink-0">
            <Card
              top="$128"
              mid="Nomaden Omah Sekut"
              bottom="San Diego California, USA"
              img={img_1}
            />
          </div>
          <div className="w-80 h-full shadow-lg shrink-0">
            <Card
              top="$128"
              mid="Nomaden Omah Sekut"
              bottom="San Diego California, USA"
              img={img_2}
            />
          </div>
          <div className="w-80 h-full shadow-lg shrink-0">
            <Card
              top="$128"
              mid="Nomaden Omah Sekut"
              bottom="San Diego California, USA"
              img={img_3}
            />
          </div>
          {/* <div className="w-80 h-full shadow-lg shrink-0">
          <Card
            top="$128"
            mid="Nomaden Omah Sekut"
            bottom="San Diego California, USA"
            img={img_1}
          />
        </div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default SectionThree;
