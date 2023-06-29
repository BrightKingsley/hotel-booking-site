import React from "react";
import { Button } from "@/components";
import heroImg from "./assets/hero-img.jpg";
import person_1 from "./assets/person-01.jpg";
import person_2 from "./assets/person-02.jpg";
import person_3 from "./assets/person-03.jpg";
import { motion } from "framer-motion";

const Section = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{ amount: 0.5 }}
      transition={{ type: "keyframes" }}
      className="w-full mx-auto flex flex-col md:flex-col-reverse px-2 md:px-16 text-center md:text-start"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="relative md:h-96"
      >
        element="sectionOne.img" position="right-4 top-4" type="image"
        <img
          className="w-full h-full object-cover shadow-xl shadow-black/20"
          src={heroImg}
          alt="hero"
        />
        <div className="hidden absolute -bottom-5 left-4 md:flex bg-body justify-between items-center w-[30rem]  py-2 px-4  shadow-xl shadow-gray-400/10 ">
          <div className="flex justify-between w-full mr-8 outline-2 outline-double outline-offset-4 outline-primary">
            element="sectionOne.tab.texts" position="-right-4 -top-4"
            <div className="text-center">
              <small>smth</small>
              <p className="font-bold">San Diego</p>
            </div>
            <div className="text-center">
              <small>smth</small>
              <p className="font-bold">San Diego</p>
            </div>
            <div className="text-center">
              <small>smth</small>
              <p className="font-bold">San Diego</p>
            </div>
          </div>
          <Button>
            element="sectionOne.tab.action" position="-right-4 -top-4" Search
          </Button>
        </div>
      </motion.div>
      <div className="flex-[1] md:flex items-center gap-14 py-14 ">
        <div className="relative md:flex-[5]">
          {/* Edit Icon */}

          <h1 className="text-6xl lg:text-[5.2rem] font-bold ">
            Let's Find Your Comfort element="sectionOne.heading"
            position="right-0 top-0"{" "}
            <span className="relative text-primary ">
              House! element="section-one-heading" position="-right-8 top-4"
            </span>
          </h1>
        </div>
        <div className="md:flex-[4]">
          <p className="capitalize md:text-lg mb-8">
            Find comfort in the house with us. Want to find a home? We are ready
            to help you wholeheartedly based on what you need
          </p>
          <Button>Read More</Button>

          <div className=" flex items-center gap-2 mt-8 justify-center md:justify-start ">
            <div className="flex items-center justify-center">
              element="sectionOne.subImgs" position="-right-2 -top-2"
              <span className="w-7 h-7 rounded-full overflow-clip">
                <img
                  src={person_1}
                  alt="person one"
                  className="object-cover w-full h-full"
                />
              </span>
              <span className="w-7 h-7 rounded-full overflow-clip -translate-x-1 border-l-2 border-l-white">
                <img
                  src={person_2}
                  alt="person one"
                  className="object-cover w-full h-full"
                />
              </span>
              <span className="w-7 h-7 rounded-full overflow-clip -translate-x-2 border-l-2 border-l-white">
                <img
                  src={person_3}
                  alt="person one"
                  className="object-cover w-full h-full"
                />
              </span>
            </div>
            <p>
              8,200+ people pinned this element="sectionOne.subText"
              position="-right-4 -top-4"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Section;
