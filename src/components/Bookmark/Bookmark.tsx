import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, ModalContext } from "@/context";
import { UpdateUser } from "@/utils";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

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

  const handleClick = () => {
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

  const toggleBookmark = async () => {
    if (!bookmarked) {
      const result: User | string = await new UpdateUser({
        uid: user.uid,
        token,
      }).addToBookmarks(hotelId);
      typeof result != "string" && setBookmarked(true);
      // setUserById(user.uid, token);
    }

    if (bookmarked) {
      const result: User | string = await new UpdateUser({
        uid: user.uid,
        token,
      }).removeFromBookmarks(hotelId);
      typeof result != "string" && setBookmarked(true);
      // setUserById(user.uid, token);
    }
  };

  // const handleBookmark = () => {
  // };

  return (
    <span onClick={handleClick} className={""} title="bookmark hotel">
      <button>{bookmarked ? <IoBookmark /> : <IoBookmarkOutline />}</button>
    </span>
  );
}
