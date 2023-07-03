import { db } from "@/api";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
export const getHotels = async ({
  sort,
  type,
  price,
  ratings,
}: {
  sort?: string;
  type?: string;
  ratings?: [number, number];
  price?: [number, number];
}) => {
  try {
    let documents: any;
    const hotelCollectionRef = collection(db, "hotels");
    const querySnapshot = await getDocs(hotelCollectionRef);

    console.log(type, price, ratings);

    // Extract the data from each document
    documents = querySnapshot.docs.map((doc) => doc.data());

    if (type) {
      documents = documents.filter((doc: any) => doc.type === type);
    }

    if (price) {
      documents = documents.filter(
        (doc: any) => doc.price >= price[0] && doc.price <= price[1]
      );
    }

    if (ratings) {
      documents = documents.filter(
        (doc: any) => doc.ratings >= ratings[0] && doc.ratings <= ratings[1]
      );
    }
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
