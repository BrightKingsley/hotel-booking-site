import { createContext, useState, useContext, useEffect } from "react";
import NotificationContext from "./notificationContext";

import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "@firebase/auth";

import { db, auth } from "@api/firebase";
import { updateProfile, User as FirebaseUser } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  addItemToLocalStorage,
  getUser,
  removeItemFromLocalStorage,
} from "@/utils";
import { User } from "@/models";

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
  }: signUpWithEmailAndPassword) => Promise<User | null>;
  loginWithEmailAndPassword: ({
    email,
    password,
  }: loginWithEmailAndPassword) => Promise<User | null>;
  logoutUser: Function;
  googleAuth: Function;
  token: string;
};

const AuthContext = createContext<AuthContextType>({
  user: {
    uid: "",
    bookmarks: [],
    photoURL: "",
  },
  loading: false,
  error: "",
  setUser: () => {},
  signUpWithEmailAndPassword: () => Promise.resolve(null),
  loginWithEmailAndPassword: () => Promise.resolve(null),
  logoutUser: () => {},
  googleAuth: () => {},
  token: "",
});

const provider = new GoogleAuthProvider();

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

  useEffect(() => {}, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  const createUserDocument = async ({
    credential,
    firstname,
    email,
  }: {
    credential: any;
    firstname: string | null;
    email: string | null;
  }) => {
    const { uid, photoURL } = credential.user;
    if (!uid) {
      triggerNotification("sign up failed");
      return null;
    }
    setUser({ uid, firstname, photoURL, bookmarks: [] });
    try {
      //Update profile
      await updateProfile(credential.user, {
        displayName: firstname,
      });
      //create user on firestore
      await setDoc(doc(db, "users", credential.user.uid), {
        uid: credential.user.uid,
        email,
        firstname,
        photoURL,
        bookmarks: [],
      });

      return {
        uid,
        email,
        firstname,
        photoURL,
        bookmarks: [],
      };

      //create empty user chats on firestore
      // await setDoc(doc(firestore, "userChats", userCredential.user.uid), {});
    } catch (err: any) {
      setError(err.message);
    }
    triggerNotification("sign up failed");
    setLoading(false);
  };

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
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("CREDENTIAL", userCredential);

      // Signed in
      const createdUser = await createUserDocument({
        credential: userCredential,
        email,
        firstname,
      });

      /*
      // Signed in
      const { uid, displayName, photoURL }: FirebaseUser = userCredential.user;
      if (!user) {
        return triggerNotification("signed up successfully");
      }
      setUser({ uid, photoURL, bookmarks: [] });
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
      */
      if (!createdUser) {
        triggerNotification("sign up failed");
        setLoading(false);
        return null;
      }
      setUser(createdUser);
      triggerNotification("Signed up successfully");
      setLoading(false);
      addItemToLocalStorage({ item: createdUser.uid, name: "uid" });
      return createdUser;
    } catch (err: any) {
      console.log("ERROR", error);
      setError(err.message);
      setLoading(false);
      triggerNotification("sign up failed");
      return null;
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
      const { uid }: FirebaseUser = userCredential.user;

      if (!uid) {
        triggerNotification("log in failed ");
        setLoading(false);
        return null;
      }
      const userDocument = await getUser(uid);
      if (!user) {
        setLoading(false);
        triggerNotification("login failed");
        return null;
      }
      setUser(userDocument);
      setLoading(false);
      triggerNotification("signed up successfully");
      addItemToLocalStorage({ item: userDocument?.uid, name: "uid" });

      return userDocument;
    } catch (error: any) {
      setLoading(false);
      triggerNotification("sign up failed");
      return null;
    }
  };

  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      //NOTE {find something to do with this}
      const token = credential?.accessToken;

      if (!result.user) return null;
      const createdUser = await createUserDocument({
        credential: result,
        email: result.user.email,
        firstname: result.user.displayName,
      });

      if (!createdUser) {
        triggerNotification("sign up failed");
        setLoading(false);
        return null;
      }
      // The signed-in user info.
      setUser(createdUser);
      triggerNotification("signed in successfully");
      setLoading(false);
      addItemToLocalStorage({ item: createdUser.uid, name: "uid" });
      return createdUser;
    } catch (error: any) {
      // Handle Errors here.

      const credential = GoogleAuthProvider.credentialFromError(error);
      // The email of the user's account used.

      // The AuthCredential type that was used.
      return null;
    }
  };

  const logoutUser = async () => {
    try {
      const authState = await signOut(auth);
      removeItemFromLocalStorage("uid");
      triggerNotification("signed out");
      setUser(null);
    } catch (error) {}
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
