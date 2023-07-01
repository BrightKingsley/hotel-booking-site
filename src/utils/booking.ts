import { doc, setDoc } from "firebase/firestore";
import { getUser } from "./handleUser";
import { db } from "@/api";

export const bookHotel = async ({
  uid,
  hotelId,
  firstname,
  lastname,
  email,
  contact,
  checkIn,
  checkOut,
  total,
}: {
  path;
  uid: string;
  hotelId: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  checkIn: string;
  checkOut: string;
  total: number;
}) => {
  try {
    const user = await getUser(uid);
    if (!user) throw new Error("invalid user");

    //create user on firestore
    try {
      const booking: any = await setDoc(doc(db, "bookings", uid), {
        uid,
        hotelId,
        firstname,
        lastname,
        email,
        contact,
        checkIn,
        checkOut,
        total,
      });

      if (!booking) throw new Error("couldn't add booking");

      return "success";
    } catch (err) {
      console.log(err);
      return null;
    }
    // await setDoc(doc(firestore, "userChats", userCredential.user.uid), {});
  } catch (err: any) {
    console.log(err);
    return null;
  }
};
