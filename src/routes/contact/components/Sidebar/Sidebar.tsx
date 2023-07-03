import { useContext, useEffect, useState } from "react";
import { doc, DocumentData } from "@firebase/firestore";
import { onSnapshot } from "firebase/firestore";

import { AuthContext, ChatContext } from "@/context";
import { db } from "@/api";
import { NavLink } from "react-router-dom";
import { ChatItem, User } from "@/models";

export default function Sidebar() {
  const [chats, setChats] = useState<ChatItem[] | null | any>([]);

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (user && user?.uid) {
        const unsub = onSnapshot(doc(db, "chats", user?.uid), (doc) => {
          setChats(doc.data());
        });

        return () => {
          unsub();
        };
      }
    };

    user?.uid && getChats();
  }, [user, user?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="w-full h-full bg-gradient-primary flex-[2]">
      <div className="chats">
        {chats ? (
          Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => {
              return (
                <NavLink
                  to={chat.id}
                  className=""
                  key={chat[0]}
                  // onClick={() => {
                  //   handleSelect(chat[1].userInfo);
                  // }}
                >
                  {/* <img src={chat[1]?.userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                  <span>{chat[1]?.userInfo.displayName}</span>
                  <p>{chat[1]?.lastMessage?.text}</p>
                </div> */}
                </NavLink>
              );
            })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
