import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import NotificationContext from "./notificationContext";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firestore, storage } from "@/api";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";

import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from "@firebase/auth";
import { type } from "os";
import AuthContext from "./authContext";

type UserContextType = {
  user: {
    [key: string]: any;
  };
  error: string;
  loading: boolean;
  signUpWithEmailAndPassword: Function;
  loginWithEmailAndPassword: Function;
  logoutUser: Function;
  googleAuth: Function;
};

const UserContext = createContext<UserContextType>({
  user: {},
  loading: false,
  error: "",
  signUpWithEmailAndPassword: () => {},
  loginWithEmailAndPassword: () => {},
  logoutUser: () => {},
  googleAuth: () => {},
});

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { triggerNotification } = useContext(NotificationContext);
  const { user, setUser } = useContext(AuthContext);

  const addBookmark = (id: string) => {};

  const removeFromBookmarks = async (id: string): Promise<User | string> => {
    try {
      //add some logic to check if the id is a valid hotel id
      const docExists = true;
      if (!docExists) {
        return "unable to add bookmark";
      }

      //NOTE RE-check this!!!
      const newDoc: any = await updateDoc(doc(firestore, "users", user?.uid), {
        bookmarks: arrayUnion(id),
      });
      return newDoc;
    } catch (error) {
      return "unable to add bookmark";
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
