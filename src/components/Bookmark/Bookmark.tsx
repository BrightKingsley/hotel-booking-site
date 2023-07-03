import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, ModalContext } from "@/context";
import { addToBookmarks, removeFromBookmarks } from "@/utils";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { User } from "@/models";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/api";

export default function Bookmark({ hotelId }: { hotelId: string }) {
  const { token, user } = useContext(AuthContext);

  const [bookmarked, setBookmarked] = useState(
    user ? user?.bookmarks?.includes(hotelId) : null
  );

  const { triggerModal } = useContext(ModalContext);

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/auth/login");
  };

  useEffect(() => {
    if (user?.uid) {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        if (doc.data()?.bookmarks.contains(hotelId)) {
          setBookmarked(true);
        } else {
          setBookmarked(false);
        }
      });
      return () => unsub();
    }
  }, []);

  /* 
  import { useState, useEffect } from 'react';
import { db } from './firebase';

function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('users')
      .doc('')
      .onSnapshot((doc) => {
        setData(doc.data().myNestedArray);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}

  */

  useEffect(() => {
    const hasBookmark = user?.bookmarks?.includes(hotelId);
    hasBookmark ? setBookmarked(true) : setBookmarked(false);
  }, [user?.bookmarks, hotelId]);

  const toggleBookmark = async () => {
    if (!bookmarked) {
      const result: User | string = await addToBookmarks(hotelId);
      typeof result != "string" && setBookmarked(true);
      return;
    }

    if (bookmarked) {
      const result: User | string = await removeFromBookmarks(hotelId);
      typeof result != "string" && setBookmarked(false);
      return;
      // setUserById(user.uid, token);
    }
  };

  const handleBookmark = () => {
    user
      ? toggleBookmark()
      : triggerModal({
          message: "You must be logged in to add a bookmark. Login now?",
          confirm: () => navigateLogin,
          cancel: () => triggerModal,
        });
  };

  useEffect(() => {
    const hasBookmark = user?.bookmarks?.includes(hotelId);
    hasBookmark ? setBookmarked(true) : setBookmarked(false);
  }, [user?.bookmarks, hotelId]);

  return (
    <button
      onClick={handleBookmark}
      className={
        "text-primary text-2xl active:text-white active:bg-gradient-primary p-1 rounded-md transition-all duration-100 hover:bg-primary/10"
      }
      title="bookmark hotel"
    >
      {bookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
    </button>
  );
}
