import { db } from "@/api";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
// import hotels from "@/data/hotels-min.json";
import hotels from "@/data/hotels.json";

export const getHotels = async (sort?: string, params?: string) => {
  try {
    const hotelCollectionRef = collection(db, "hotels");
    const querySnapshot = await getDocs(hotelCollectionRef);

    // Extract the data from each document
    const documents = querySnapshot.docs.map((doc) => doc.data());
    console.log("documents", documents);

    return documents;
  } catch (error) {
    // Handle any errors that occur during the retrieval
    console.error("Error retrieving hotel documents:", error);
    throw error;
  }
};

export const getHotel = async (documentId: string): Promise<any> => {
  // write code to get a single document from the "hotel" collection with firebase including error handling

  try {
    // Retrieve the document using its ID
    const docRef = doc(db, "hotels", documentId);
    const snapshot = await getDoc(docRef);

    // Check if the document exists
    if (snapshot.exists()) {
      // Document found, return its data
      return snapshot.data();
    } else {
      throw new Error("Document does not exist.");
    }
  } catch (error) {
    // Handle any errors that occur during the retrieval
    console.error("Error retrieving hotel document:", error);
    // throw error;
    return null;
  }
};
