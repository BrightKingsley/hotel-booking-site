import { AnimatePresence, motion } from "framer-motion";

export default function Notifications({
  content,
}: {
  content: "notifications";
}) {
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
