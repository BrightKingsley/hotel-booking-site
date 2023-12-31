import { KeyboardEventHandler, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import Overlay from "../Overlay";
import Button from "../Button";
import { ModalContext } from "@/context";
import { IoClose } from "react-icons/io5";
import Close from "../Close";
import { AnimatePresence, motion } from "framer-motion";

const modal = document.getElementById("modal")!;

export default function Modal() {
  const {
    showModal,
    triggerModal,
    modalMessage,
    actionConfirm,
    actionCancel,
    disableOnClick,
  } = useContext(ModalContext);

  return createPortal(
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed w-full h-full z-50 top-0 left-0 flex items-center justify-center"
        >
          <Overlay
            show={showModal}
            handleShowOverlay={actionCancel}
            disableOnClick={disableOnClick}
          />
          <AnimatePresence>
            {showModal && (
              <motion.div
                className={
                  "bg-body relative rounded-md p-2 pb-4 text-center space-y-8 w-11/12 sm:w-96 z-50"
                }
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <div className="absolute  right-1 top-1 cursor-pointer z-50">
                  <Close close={actionCancel} />
                </div>
                <div className={""}>{modalMessage}</div>
                <div className={"flex gap-8 mx-auto w-full justify-around"}>
                  <Button
                    color="error"
                    onClick={() => {
                      actionCancel();
                      triggerModal({});
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      actionConfirm();
                      triggerModal({ show: false });
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    modal
  );
}
