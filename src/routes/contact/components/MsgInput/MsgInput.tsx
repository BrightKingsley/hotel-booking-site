import { useContext, useState } from "react";
import { Girl } from "@/assets";
import { BiImage } from "react-icons/bi";
import { Button } from "@/components";
import { inputStyles } from "@/constants";
import { AuthContext, ChatContext } from "@/context";
import {
  arrayUnion,
  doc,
  DocumentData,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db, storage } from "@/api";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

export default function MsgInput() {
  const [text, setText] = useState("");
  const [img, setImg] = useState<Blob | Uint8Array | ArrayBuffer | null>(null);

  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSendMessage = async ({
    img,
    user,
    text,
  }: {
    img: Blob | Uint8Array | ArrayBuffer | null;
    user: User | null;
    text: string;
    data: any;
    setText: Function;
    setImg: Function;
  }) => {
    if (img) {
      const storageRef = ref(storage, uuid());
      //   const uploadTask = await uploadBytesResumable(storageRef, img);

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "messages", data.chatId), {
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

    await updateDoc(doc(db, "chats", user && user.uid ? user?.uid : ""), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "chats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };

  const handleKey = (e: KeyboardEvent) => {
    e.code === "Enter" &&
      handleSendMessage({ data, img, setImg, setText, text, user });
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
          <Button full onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
