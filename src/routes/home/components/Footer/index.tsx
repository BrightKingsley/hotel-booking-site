import {} from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{ amount: 0.5 }}
      className="grid grid-cols-2 md:flex md:flex-row w-full justify-between px-2 md:px-16 my-16 gap-10 leading-8"
    >
      <div className="md:flex-[2] col-span-2">
        <h3 className="text-2xl text-primary text-center font-bold w-fit md:text-left">
          LOGO
        </h3>
        <p className="mt-4 text-center md:text-left">
          Find comfort in the house with us. Want to find a home?We are ready to
          help you wholeheartedly based on what you need
        </p>
      </div>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ type: "keyframes", duration: 0.5, delay: 0 }}
        className="col-span-1 md:flex-1"
      >
        <h4 className="font-bold">Company</h4>
        <div>
          <p>About Us</p>
          <p>Contact</p>
          <p>Career</p>
          <p>Blog</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ type: "keyframes", duration: 0.5, delay: 0.2 }}
        className="col-span-1 md:flex-1"
      >
        <h4 className="font-bold">Contact Us</h4>
        <div>
          <p>Website</p>
          <p>Email</p>
          <p>Whatsapp</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ type: "keyframes", duration: 0.5, delay: 0.4 }}
        className="col-span-1 md:flex-1"
      >
        <h4 className="font-bold">Support</h4>
        <div>
          <p>FAQ</p>
          <p>Booking</p>
          <p>City Guide</p>
          <p>Cancellation option</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ type: "keyframes", duration: 0.5, delay: 0.6 }}
        className="col-span-1 md:flex-1"
      >
        <h4 className="font-bold">Office</h4>
        <div>
          <p>Domain Street District</p>
          <p>Ojo, Lagos</p>
          <p>+234 802 124 6576</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
