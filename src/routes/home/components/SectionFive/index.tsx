import {} from "react";
import { Button } from "@/components";
import { motion } from "framer-motion";

const SectionFive = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{ type: "keyframes", ease: "linear" }}
      viewport={{ amount: 0.5 }}
      className="flex flex-col items-center gap-8 bg-gray-900 mx-2 md:mx-16  justify-center rounded-md h-80 text-center py-12"
    >
      <h2 className="text-white text-3xl sm:text-4xl font-bold">
        Subscribe to Our <br /> Notification, News & Blog
      </h2>
      <div className="flex flex-col sm:flex-row w-4/5 max-w-[15rem] mx-auto md:justify-center h-32 sm:h-12 ">
        <input
          type="text"
          className="bg-gray-700 focus:outline-2 focus:border-none focus:-outline-offset-2  focus:outline-primary w-full  outline-none flex-1 sm:flex-none "
        />
        <Button>Get Started</Button>
      </div>
    </motion.div>
  );
};
export default SectionFive;
