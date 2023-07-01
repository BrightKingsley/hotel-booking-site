import React, { KeyboardEventHandler, useContext, useState } from "react";
import { Girl } from "@/assets";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/api";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext, ChatContext } from "@/context";
import { IoAttach } from "react-icons/io5";
import { BiImage } from "react-icons/bi";
import { Button } from "@/components";
import { inputStyles } from "@/constants";

export default function MsgInput() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      //   const uploadTask = await uploadBytesResumable(storageRef, img);

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: text ? text : null,
              senderId: user?.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user?.uid,
          date: Timestamp.now(),
        }),
      });
    }

    setText("");
    setImg(null);

    await updateDoc(doc(db, "userChats", user && user.uid ? user?.uid : ""), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };

  const handleKey = (e: KeyboardEvent) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <div className="flex px-2 py-1 items-center">
      <div className="flex-[5] py-2">
        <input
          onKeyDown={(e: any) => handleKey(e)}
          //@ts-ignore
          ref={ref}
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          className={inputStyles}
        />
      </div>
      <div className="flex flex-[3] items-center ">
        {/* <IoAttach /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          //@ts-ignore
          onChange={(e) => setImg(e.target.files[0])}
        />

        <label
          htmlFor="file"
          className="text-white text-2xl flex items-center justify-center bg-gradient-primary h-10 w-10 active:scale-75 transition-all duration-200 cursor-pointer"
        >
          <BiImage />
        </label>
        <div
          className="h-10 overflow-clip w-full rounded-r-2xl
        "
        >
          <Button full onClick={handleSend}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
