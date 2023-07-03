import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function AnimateInOut({
  children,
  show,
  animate,
  init,
  out,
  drag,
  handleDragEnd,
  className,
}: AnimateInOutType) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={init}
          animate={animate}
          exit={out}
          drag={drag}
          onDragEnd={() => handleDragEnd()}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
