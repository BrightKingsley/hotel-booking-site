import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PanelType } from "./types";
import Close from "../Close";
import UserProfile from "./UserProfile";
import Bookmarks from "./Bookmarks";
import Notifications from "./Notifications";

export default function Panel({ content, hide, show }: PanelType) {
  useEffect(() => {
    show &&
      window.addEventListener(
        "keydown",
        (e: any) => e.code === "Escape" && hide && hide(e)
      );
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="bg-body rounded-md w-64 h-72 fixed top-16 right-2 shadow-lg border border-gray-200 z-20"
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
