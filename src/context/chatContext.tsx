import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import AuthContext from "./authContext";
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
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChatItem, User } from "@/models";

type ChatContextType = {
  data: { chatId: string; user: User };
  dispatch: any;
  chats: ChatItem[];
};

const ChatContext = createContext<ChatContextType>({
  data: { chatId: "", user: null },
  dispatch: () => {},
  chats: [],
});

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useContext(AuthContext);

  const [chats, setChats] = useState<ChatItem[] | []>([]);
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<Blob | Uint8Array | ArrayBuffer | null>(null);

  const INITIAL_STATE = {
    chatId: "",
    user: {},
  };

  function chatReducer(state: any, action: any) {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            user && user.uid && user.uid > action.payload.uid
              ? user?.uid + action.payload.uid
              : action.payload.uid + user?.uid,
        };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const unsub = onSnapshot(doc(db, "messages", state.chatId), (doc) => {
  //     doc.exists() && setMessages(doc.data().messages);
  //   });
  //   return () => {
  //     unsub();
  //   };
  // });

  // useEffect(() => {
  //   const unsub = onSnapshot(
  //     doc(db, "chats", user && user.uid ? user.uid : ""),
  //     (doc) => {
  //       setChats(doc.data());
  //     }
  //   );

  //   return () => {
  //     unsub();
  //   };
  // }, [user, user?.uid]);

  // const handleSendMessage = async ({
  //   img,
  //   user,
  //   text,
  // }: {
  //   img: Blob | Uint8Array | ArrayBuffer | null;
  //   user: User | null;
  //   text: string;
  //   data: any;
  //   setText: Function;
  //   setImg: Function;
  // }) => {
  //   if (img) {
  //     const storageRef = ref(storage, uuid());
  //     //   const uploadTask = await uploadBytesResumable(storageRef, img);

  //     await uploadBytesResumable(storageRef, img).then(() => {
  //       getDownloadURL(storageRef).then(async (downloadURL) => {
  //         await updateDoc(doc(db, "messages", state.chatId), {
  //           messages: arrayUnion({
  //             id: uuid(),
  //             text: text ? text : null,
  //             senderId: user?.uid,
  //             date: Timestamp.now(),
  //             img: downloadURL,
  //           }),
  //         });
  //       });
  //     });
  //   } else {
  //     await updateDoc(doc(db, "chats", state.chatId), {
  //       messages: arrayUnion({
  //         id: uuid(),
  //         text,
  //         senderId: user?.uid,
  //         date: Timestamp.now(),
  //       }),
  //     });
  //   }

  //   setText("");
  //   setImg(null);

  //   await updateDoc(doc(db, "chats", user && user.uid ? user?.uid : ""), {
  //     [state.chatId + ".lastMessage"]: {
  //       text,
  //     },
  //     [state.chatId + ".date"]: serverTimestamp(),
  //   });

  //   await updateDoc(doc(db, "chats", state.user.uid), {
  //     [state.chatId + ".lastMessage"]: {
  //       text,
  //     },
  //     [state.chatId + ".date"]: serverTimestamp(),
  //   });
  // };

  return (
    <ChatContext.Provider
      value={{
        data: state,
        dispatch,
        chats,
        // messages,
        // text,
        // img,
        // handleSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
