import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import AuthContext from "./authContext";
import { getChats, getMessages } from "@/utils";
import { DocumentData } from "@firebase/firestore";

const ChatContext = createContext({});

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useContext(AuthContext);

  const [chats, setChats] = useState<DocumentData | undefined>([]);

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    // const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
    //   doc.exists() && setMessages(doc.data().messages);
    // });
    // return () => {
    //   unsub();
    // };
    getMessages(state, setMessages);
  });

  useEffect(() => {
    // const getChats = () => {
    //   const unsub = onSnapshot(
    //     doc(db, "userChats", user && user.uid ? user.uid : ""),
    //     (doc) => {
    //       setChats(doc.data());
    //     }
    //   );

    //   return () => {
    //     unsub();
    //   };
    // };

    user?.uid && getChats(user, setChats);
  }, [user, user?.uid]);

  const INITIAL_STATE = {
    chatId: null,
    user: {},
  };

  const chatReducer = (state: any, action: any) => {
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
  };

  return (
    <ChatContext.Provider value={{ data: state, dispatch, chats, messages }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
