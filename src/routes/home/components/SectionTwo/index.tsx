import React from "react";
import { Button } from "@/components";
import img_1 from "./assets/img-1.jpg";
import img_2 from "./assets/img-2.jpg";
import img_3 from "./assets/img-3.jpg";
import { motion } from "framer-motion";

const SectionTwo = () => {
  return (
    <motion.div className="flex flex-col  md:flex-row w-full items-center  justify-between px-2 py-14 md:py-20 md:px-16 gap-14 md:gap-8 lg:gap-20">
      <div className="flex-[1] w-full max-w-[25rem] sm:max-w-[80%] md:max-w-full  h-full   relative">
        element="sectionTwo.img" position="right-4 top-4" type="image"
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "keyframes" }}
          viewport={{ amount: "some" }}
          className="mx-auto py-8  w-60 md:px-4 md:py-8 lg:py-8 lg:px-0 lg:w-72 h-[30rem] z-20 relative"
        >
          <img src={img_1} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "keyframes" }}
          viewport={{ amount: "some" }}
          className="absolute w-40 sm:w-48 md:w-40 lg:w-48 h-64 top-0  left-0 z-10 "
        >
          <img src={img_2} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "keyframes" }}
          viewport={{ amount: "some" }}
          className="absolute w-40 sm:w-48 md:w-40 lg:w-48 h-64  border-2 border-indigo-50 bottom-0 right-0 z-30 "
        >
          <img src={img_3} alt="" className="w-full h-full object-cover" />
        </motion.div>
      </div>
      <div className="flex-[1] mx-auto flex flex-col text-center sm:text-left items-center md:items-start">
        <h2 className="text-[2.3rem] sm:text-5xl font-bold">
          Get to know Us More
        </h2>
        <p className="my-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
          harum corporis accusantium, necessitatibus maxime totam nobis
          consequuntur reprehenderit nam repudiandae, labore fuga cupiditate?
          Doloribus, laboriosam odio optio rem illum reiciendis, est dolorum a
          totam fugit ut maxime! Impedit quam sapiente quos, veniam, eligendi
          rerum consectetur quidem dolore aut ad esse.
        </p>
        <Button>Read More</Button>
        <div className="w-full flex flex-col px-8 md:px-0 divide-y-2 sm:flex-row sm:divide-y-0 gap-2 items-center text-center md:text-start mt-8">
          <div className="relative w-full pt-4 sm:pt-0 flex flex-col items-center md:items-start  justify-center after:absolute sm:after:w-[2px] sm:after:right-2 lg:after:-right-1 md:after:-right-3 after:h-4/6 after:bg-gray-200    ">
            <h2 className="font-bold  text-4xl text-primary">336+</h2>
            <p className=" whitespace-nowrap">Apartment Sale</p>
          </div>
          <div className="relative w-full pt-4 sm:pt-0 flex flex-col items-center md:items-start justify-center md:pl-4 after:absolute sm:after:-right-2 sm:after:w-[2px] md:after:-right-4 lg:after:-right-3 after:h-4/6 after:bg-gray-200  ">
            <h2 className="font-bold  text-4xl text-primary">220+</h2>
            <p className=" whitespace-nowrap">Completed Projects</p>
          </div>
          <div className="w-full flex flex-col pt-4 sm:pt-0  items-center md:items-start justify-center md:pl-4">
            <h2 className="font-bold  text-4xl  text-primary">500+</h2>
            <p className=" whitespace-nowrap">Happy Clients</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SectionTwo;
