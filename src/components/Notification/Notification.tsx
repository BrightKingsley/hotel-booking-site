import React, { useContext, useEffect } from "react";
import { createPortal } from "react-dom";

import { NotificationContext } from "../../context";

import { IoNotifications } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Media from "react-media";

const notification = document.getElementById("notification")!;
const Notification = () => {
  const { showNotification, notificationMessage } =
    useContext(NotificationContext);

  useEffect(() => {
  }, [showNotification]);

  return createPortal(
    <Media queries={{ small: { maxWidth: 576 } }}>
      {(matches) => (
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{
                opacity: 0,
                x: matches.small ? 0 : "100%",
                y: matches.small ? "-100%" : 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: matches.small ? 0 : "100%",
                y: matches.small ? "-100%" : 0,
                scale: 0,
              }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              className="fixed p-3 right-16 w-11/12 sm:w-80 bg-white rounded-lg sm:rounded-xl flex items-center gap-2 outline outline-primary ring-offset-4 z-50 top-4 sm:top-auto sm:bottom-16 inset-notification h-fit shadow-lg shadow-primary/30"
            >
              <span className="text-primary">
                <IoNotifications />
              </span>
              <p className="text-gray-700">{notificationMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Media>,
    notification
  );
};

export default Notification;
