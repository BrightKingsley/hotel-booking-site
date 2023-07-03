import React, { useContext, useEffect, useState } from "react";
import Message from "../Message";
import { ChatContext } from "@/context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/api";
import { Message as MessageType } from "@/models";

const Messages = () => {
  const [messages, setMessages] = useState<MessageType[] | null>([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "chats", data?.chatId ? data.chatId : ""),
      (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      }
    );
    return () => {
      unsub();
    };
  });

  return (
    <div className="w-full h-full bg-white after:absolute after:bg-primary/20 after:w-full after:h-full ">
      {messages?.map((message) => (
        <Message key={message.id} messageInfo={message} />
      ))}
    </div>
  );
};

export default Messages;
