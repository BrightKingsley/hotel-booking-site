import { MutableRefObject, Ref, useContext, useEffect, useRef } from "react";
import { AuthContext, ChatContext } from "@/context";
import { motion } from "framer-motion";

export default function Message({
  messageInfo: message,
}: {
  messageInfo: any;
}) {
  // const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // useEffect(() => {}, []);

  const ref: MutableRefObject<HTMLDivElement | null | undefined> = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });

    // console.log("Date:", message.date.seconds);

    const minutes = new Date(Date.now()).getMinutes();
    const seconds = new Date(Date.now()).getSeconds();

    console.log(`${minutes}:${seconds}`);
  }, [message]);

  return (
    <div
      ref={() => ref}
      // className={`message ${message.senderId === user?.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            ""
            // message.senderId === user?.uid
            //   ? user?.photoURL
            //   : data.user?.photoURL
          }
          alt=""
        />
        <span>{Date.now().toLocaleString()}</span>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={true}
        dragSnapToOrigin
        className="mx-auto messageContent bg-orange-500 w-fit p-3 rounded-md"
        onDragEnd={() => console.log("draegEnd")}
      >
        {/* {message.text && <p>{message?.text} </p>} */}
        {/* {message.img && <img src={message.img} alt="" />} */}
        testing message
      </motion.div>
    </div>
  );
}
