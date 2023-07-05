import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getUser } from "./handleUser";
import { db } from "@/api";
import { v4 as uuid } from "uuid";

export const bookHotel = async ({
  uid,
  hotelId,
  hotel,
  firstname,
  lastname,
  email,
  contact,
  checkIn,
  checkOut,
  price,
  type,
}: {
  uid: string;
  hotelId: string;
  hotel: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  checkIn: string;
  checkOut: string;
  price: number;
  type: string;
}) => {
  try {
    const user = await getUser(uid);
    if (!user) throw new Error("invalid user");
    try {
      // Retrieve the document using its ID
      const colRef = collection(db, "bookings");
      const querySnapshot = await getDocs(colRef);

      const bookings = querySnapshot.docs.map((doc: any) => doc.data());
      // Check if the document exists
       const exists = bookings.some(
        (booking: any) => booking.uid === uid && booking.hotelId === hotelId
      );

      // Document found, cancel to prevent duplicate booking
      if (exists) {
        return "exists";
      }
      
      await setDoc(doc(db, "bookings", uuid()), {
        uid,
        hotelId,
        firstname,
        lastname,
        email,
        contact,
        checkIn,
        checkOut,
        total: 0.75 * price + price,
        type,
      });

      console.log("SUCCESS");
      return "success";
    } catch (err) {
      console.log("Error", err);
      return null;
    }
  } catch (err: any) {
    console.log(err);
    return null;
  }
};

export const getBookings = async () => {
  try {
    const hotelCollectionRef = collection(db, "bookings");
    const querySnapshot = await getDocs(hotelCollectionRef);

    // Extract the data from each document
    const documents = querySnapshot.docs.map((doc) => doc.data());

    console.log("DOCUMENTS", documents);

    return documents;
  } catch (error) {
    // Handle any errors that occur during the retrieval
    console.error("Error retrieving hotel documents:", error);
    return null;
  }
};
