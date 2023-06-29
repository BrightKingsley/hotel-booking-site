import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import NotificationContext from "./notificationContext";

import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from "@firebase/auth";

import { storage, db } from "@api/firebase";
import { updateProfile, User as FirebaseUser } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type signUpWithEmailAndPassword = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

type loginWithEmailAndPassword = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  error: string;
  loading: boolean;
  setUser: Function;
  signUpWithEmailAndPassword: ({
    firstname,
    lastname,
    email,
    password,
  }: signUpWithEmailAndPassword) => void;
  loginWithEmailAndPassword: ({
    email,
    password,
  }: loginWithEmailAndPassword) => void;
  logoutUser: Function;
  googleAuth: Function;
  token: string;
};

const AuthContext = createContext<AuthContextType>({
  user: {
    uid: "",
    bookmarks: [],
    displayName: "",
    photoURL: "",
  },
  loading: false,
  error: "",
  setUser: () => {},
  signUpWithEmailAndPassword: () => {},
  loginWithEmailAndPassword: () => {},
  logoutUser: () => {},
  googleAuth: () => {},
  token: "",
});

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const { triggerNotification } = useContext(NotificationContext);

  const signUpWithEmailAndPassword = async ({
    firstname = "",
    lastname = "",
    email = "",
    password = "",
  }: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    console.log("RUNNING", firstname, lastname, email, password);
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Signed in
      const { uid, displayName, photoURL }: FirebaseUser = userCredential.user;
      console.log("USER:", user);
      if (!user) {
        return triggerNotification("signed up successfully");
      }
      setUser({ uid, displayName, photoURL, bookmarks: [] });
      try {
        //Update profile
        await updateProfile(userCredential.user, {
          displayName: firstname,
        });
        //create user on firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          firstname,
          lastname,
          email,
        });

        //create empty user chats on firestore
        // await setDoc(doc(firestore, "userChats", userCredential.user.uid), {});
      } catch (err: any) {
        setError(err.message);
        setTimeout(() => {
          setLoading(false);
          triggerNotification("sign up failed");
        }, 1000);
      }
      triggerNotification("sign up failed");
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => {
        setLoading(false);
        triggerNotification("sign up failed");
      }, 1000);
    }
  };

  const loginWithEmailAndPassword = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Signed in
      const { uid, displayName, photoURL }: FirebaseUser = userCredential.user;
      if (user) {
        setUser({ uid, displayName, photoURL, bookmarks: [] });
        triggerNotification("signed up successfully");
      }
      setTimeout(() => {
        setLoading(false);
        triggerNotification("sign up failed");
      }, 1000);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setTimeout(() => {
        setLoading(false);
        triggerNotification("sign up failed");
      }, 500);
    }
  };

  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };

  const logoutUser = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        triggerNotification("sign-out successful");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        signUpWithEmailAndPassword,
        loginWithEmailAndPassword,
        logoutUser,
        googleAuth,
        setUser,
        loading,
        user,
        error,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
