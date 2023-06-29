import { useEffect, useState } from "react";
import { Button } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import Media from "react-media";

const Header = () => {
  const [showNav, setShowNav] = useState(true);

  const handleShowNav = () => {
    setShowNav((prev) => !prev);
  };

  return (
    // <AnimatePresence>
    <motion.div
      // animate={{ height: showNav ? "15rem" : "3rem" }}
      // exit={{ x: "-100%", opacity: 0 }}
      className={`bg-body w-full flex justify-between ${
        showNav ? "h-[14rem]" : "h-[3rem]"
      } md:items-center md:h-16 px-2 md:px-16 z-40 pt-2 transition-all duration-300  `}
    >
      <span className="text-primary font-bold">LOGO</span>
      <Media queries={{ small: { maxWidth: 576 } }}>
        {(matches) => {
          console.log("MATCHES", matches);
          return (
            <AnimatePresence>
              {showNav && matches.small && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`flex flex-col translate-y-8 md:translate-y-0 items-center divide-y-2 w-full h-full  text-center md:flex-row md:divide-y-0 md:h-fit transition-all duration-300 md:gap-8"} `}
                >
                  <li className="w-full  py-3  hover:bg-primary active:scale-105 hover:text-white cursor-pointer transition-all duration-300 ease-in-out">
                    <a href="">Home</a>
                  </li>
                  <li className="w-full  py-3 hover:bg-primary active:scale-105 hover:text-white cursor-pointer transition-all duration-300 ease-in-out">
                    <a href="">About</a>
                  </li>
                  <li className="w-full  py-3 hover:bg-primary active:scale-105 hover:text-white cursor-pointer transition-all duration-300 ease-in-out">
                    <a href="">Blog</a>
                  </li>
                  <li className="w-full  py-3 hover:bg-primary active:scale-105 hover:text-white cursor-pointer transition-all duration-300 ease-in-out">
                    <a href="">Properties</a>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          );
        }}
      </Media>

      <div className="hidden md:inline-block">
        <Button>Register</Button>
      </div>

      <div
        onClick={handleShowNav}
        className="md:hidden relative cursor-pointer min-w-[2.5rem] !w-10 h-6 flex flex-col items-center justify-center transition-all duration-100 ease-in-out "
      >
        <span
          className={`h-[3px] static bg-primary before:absolute  before:h-[3px] before:top-0 before:bg-primary after:absolute  after:h-[3px] after:bottom-0 after:bg-primary transition-all duration-300 ease-in-out before:transition-all before:duration-300 before:ease-in-out after:transition-all after:duration-300 after:ease-in-out self-end ${
            showNav
              ? "after:w-full  before:w-6 after:right-0  after:bg-black w-8 before:right-0"
              : "before:w-full before:right-0 after:w-6 after:right-0 w-8 "
          }`}
        ></span>
      </div>
    </motion.div>
    //{/* </AnimatePresence> */}
  );
};

export default Header;
