import {} from "react";
import Button from "../Button";
import { AnimatePresence, motion } from "framer-motion";

export default function Dropdown({
  show,
  text,
  actionCancel,
  actionConfirm,
  altConfirm,
}: Dropdown) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: "-30%", scale: 0.8 }}
          animate={{ opacity: 1, y: "0", scale: 1 }}
          exit={{ opacity: 0, y: "-30%", scale: 0.8 }}
          className={
            "bg-body z-20 rounded-md w-fit text-center shadow-md p-2 absolute"
          }
          // style={{
          //   width: 300,
          //   height: 400,
          // }}
        >
          <p>{text}</p>
          <div className="flex gap-1">
            <div className="">
              <Button onClick={actionCancel} text="xs" color="error">
                cancel
              </Button>
            </div>
            {!altConfirm ? (
              <div className="">
                <Button onClick={actionConfirm} text="xs">
                  confirm
                </Button>
              </div>
            ) : (
              altConfirm
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
