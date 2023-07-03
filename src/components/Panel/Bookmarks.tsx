import { AnimatePresence, animate, motion } from "framer-motion";
import { Zzz } from "@/assets";
import Bookmark from "../Bookmark";
import { useState } from "react";

export default function Bookmarks({ content }: { content: "bookmarks" }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  return (
    <AnimatePresence>
      {content === "bookmarks" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className=" overflow-scroll h-full"
        >
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark, i) => (
              <motion.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ delay: i / 10, duration: (i + 8) / 10 }}
                className="flex items-center rounded-lg p-2 border-primary border-2 my-1 cursor-pointer hover:bg-primary hover:text-white active:hover:transition-all active:hover:duration-200 active:bg-white active:scale-95 active:text-gray-400"
              >
                <div className="rounded-full bg-primary w-10 h-10 overflow-clip">
                  <img src="" />
                </div>
                <p className="ml-2">bookmark</p>

                <div className="ml-auto">
                  <Bookmark hotelId="" />
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              //   transition={{ delay: i / 10, duration: (i + 8) / 10 }}
              className="w-full space-y-4 pt-8"
            >
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="w-16 mx-auto"
              >
                <img src={Zzz} />
              </motion.div>
              <motion.p
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="w-fit mx-auto"
              >
                you have no bookmarks
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
