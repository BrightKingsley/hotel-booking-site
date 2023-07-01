import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/api";

export const getMessages = (data: any, setMessages: Function) => {
  const unsub = onSnapshot(doc(db, "messsages", data.chatId), (doc) => {
    doc.exists() && setMessages(doc.data().messages);
  });

  return () => {
    unsub();
  };
};

export const getChats = (user: User, setChats: Function) => {
  const unsub = onSnapshot(
    doc(db, "chats", user && user.uid ? user.uid : ""),
    (doc) => {
      doc.exists() && setChats(doc.data());
    }
  );

  return () => {
    unsub();
  };
};
