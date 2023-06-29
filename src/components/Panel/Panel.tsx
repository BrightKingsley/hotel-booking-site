import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PanelType } from "./types";
import Close from "../Close";
import UserProfile from "./UserProfile";

export default function Panel({ content, hide, show }: PanelType) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="bg-body rounded-md w-64 h-72 fixed top-16 right-2 shadow-lg border-t-2 border-gray-100 z-20"
        >
          <motion.div
            initial={{ x: "-120%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative w-full h-full p-4"
          >
            <div className="fixed right-1 top-1 cursor-pointer z-50">
              <Close close={hide} />
            </div>
            {content === "bookmarks" ? (
              <Bookmarks content={content} />
            ) : content === "profile" ? (
              <Profile content={content} />
            ) : content === "notifications" ? (
              <Notifications content={content} />
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Profile({ content }: { content: string }) {
  return (
    <AnimatePresence>
      {content === "profile" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <UserProfile />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

let bookmarks: string[] = [];
for (let i = 0; i < 10; i++) {
  bookmarks.push("bookmark " + (i + 1));
}
function Bookmarks({ content }: { content: "bookmarks" }) {
  return (
    <AnimatePresence>
      {content === "bookmarks" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className=" overflow-scroll h-full"
        >
          {bookmarks.map((bookmark, i) => (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ delay: i / 10, duration: (i + 8) / 10 }}
              className="rounded-lg p-2 border-primary border-2 my-1 cursor-pointer hover:bg-primary hover:text-white active:hover:transition-all active:hover:duration-200 active:bg-white active:scale-95 active:text-gray-400"
            >
              {bookmark}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Notifications({ content }: { content: "notifications" }) {
  return (
    <AnimatePresence>
      {content === "notifications" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <div>Notifications</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
