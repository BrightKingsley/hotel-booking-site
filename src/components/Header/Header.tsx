import { useContext, useState } from "react";
import Button from "../Button";
import { AnimatePresence, motion } from "framer-motion";
import { FaBookmark, FaSearch, FaUser } from "react-icons/fa";
import Panel from "../Panel/Panel";
import Media from "react-media";
import { Logo } from "@/assets";
import { AuthContext } from "@/context";
import { Link } from "react-router-dom";
import { useButtonStyle } from "@/hooks";
import { IoCart } from "react-icons/io5";
// import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Header = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [panelContent, setPanelContent] = useState("");

  const btnStyles = useButtonStyle({ color: "primary" });

  const { user } = useContext(AuthContext);

  const togglePanel = (content: string) => {
    if (panelContent === content) {
      setShowPanel(false);
      setPanelContent("");
    } else {
      setShowPanel(true);
      setPanelContent(content);
    }
  };

  const hidePanel = () => {
    setShowPanel(false);
    setPanelContent("");
  };

  return (
    // <AnimatePresence>
    <motion.div
      // animate={{ height: showNav ? "15rem" : "3rem" }}
      // exit={{ x: "-100%", opacity: 0 }}
      className="fixed bg-body w-full flex justify-between items-center  px-2 md:px-16 z-50 p-2 transition-all duration-300 border border-b  "
    >
      <Link to={"/app/hotels"} className="flex items-end gap-2">
        <div className="font-bold w-8">
          <img src={Logo} />
        </div>
        <p className="text-primary text-xl font-semibold">HotelHaven</p>
      </Link>
      <div className="flex gap-2">
        <div className="relative w-8 sm:w-64 flex items-center">
          <div
            className="flex absolute z-10 left- items-center justify-center rounded-md cursor-pointer active:scale-90 duration-200 transition-all text-primary bg-gray-100 p-2
          "
          >
            <FaSearch />
          </div>
          <Media queries={{ small: { maxWidth: 576 } }}>
            {(matches) =>
              !matches.small && (
                <input
                  type="text"
                  className="w-full h-full rounded-md bg-gray-100 text-gray-600 focus:outline focus:outline-primary indent-8 pr-2"
                />
              )
            }
          </Media>
        </div>
        {/* <button
          className="bg-red-500 h-20 w-40 z-50"
          onClick={() => importJSONToFirestore()}
        >
          SEND!
        </button> */}
        {user ? (
          <>
            <button
              title="bookmarks"
              className={`w-10 rounded-lg text-primary active:bg-primary $ active:text-white transition-all duration-150 cursor-pointer text-2xl`}
            >
              <Link to="/app/hotels/bookings">
                <IoCart className="mx-auto" />
              </Link>
            </button>
            <button
              onClick={() => togglePanel("bookmarks")}
              title="bookmarks"
              className={`p-3 rounded-lg text-primary active:bg-primary ${
                panelContent === "bookmarks" && "bg-gradient-primary text-white"
              }  active:text-white transition-all duration-150 cursor-pointer`}
            >
              <FaBookmark />
            </button>
            <button
              onClick={() => togglePanel("profile")}
              title="profile"
              className={` w-10 h-10 overflow-clip flex items-center justify-center ${
                panelContent === ("bookmarks" || "notifications")
                  ? "bg-transparent text-primary"
                  : "bg-gradient-primary text-white"
              } ${
                panelContent === "profile"
                  ? "rounded-lg ring-2 ring-primary ring-offset-2"
                  : "rounded-full"
              } transition-all duration-300 cursor-pointer  outline-none`}
            >
              {user?.photoURL ? <img src={user.photoURL} /> : <FaUser />}
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4 pl-4">
            <Link to="/auth/login" className="text-primary">
              login
            </Link>
            <Link to="/auth/signup" className={btnStyles}>
              signup
            </Link>
          </div>
        )}
      </div>

      <Panel show={showPanel} hide={hidePanel} content={panelContent} />
    </motion.div>
    //{/* </AnimatePresence> */}
  );
};

export default Header;
