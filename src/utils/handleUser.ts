import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/api";
import {
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";
import { User } from "@/models";
import { v4 as uuid}  from "uuid";

export const getUser = async (userId: string) => {
  try {
    // Retrieve the document using its ID
    const docRef = doc(db, "users", userId);
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
    return null;
  }
};

// NOTE Comeback for Change password logic
export const updateUser = async ({
  uid = "",
  image,
  bookmark,
  password,
}: {
  uid?: string;
  image?: Blob | Uint8Array | ArrayBuffer | File;
  bookmark?: string;
  password?: string;
}) => {
  try {
    let newDoc;
    if (password) {
      newDoc = await updateDoc(doc(db, "users", uid), {
        password: password,
      });
      return newDoc;
    }
  } catch (err) {
    console.log("an error occured #" + err);
    return null;
  }
};

export const updatePhotoURL = ({
  uid,
  image,
}: {
  uid: string;
  image: Blob | Uint8Array | ArrayBuffer | File;
}) => {
  let newDoc;
  const storageRef = ref(storage, uuid());

  //   const uploadTask = await uploadBytesResumable(storageRef, image);
try{
  uploadBytesResumable(storageRef, image).then(() => {
    getDownloadURL(storageRef).then(async (downloadURL) => {
      newDoc = await updateDoc(doc(db, "users", uid), {
        photoURL: downloadURL,
      });
    });
  });
  return "success";
}catch(err){
  console.log(err);
  return "failed";
}
};

export const addToBookmarks = async (id: string): Promise<User | string> => {
  try {
    //add some logic to check if the id is a valid hotel id
    console.log("Bookmarking", id);
    const docExists = true;
    if (!docExists) {
      // return Promise.resolve("unable to add bookmark");
      return "unable to add bookmark";
    }

    //NOTE RE-check this!!!
    const newDoc: any = await updateDoc(doc(db, "users", id), {
      bookmarks: arrayUnion(id),
    });
    return newDoc;
  } catch (error) {
    return "unable to add bookmark";
  }
};

// NOTE : Implement the delete functionality
export const removeFromBookmarks = async (
  id: string
): Promise<User | string> => {
  try {
    //add some logic to check if the id is a valid hotel id
    const docExists = true;
    if (!docExists) {
      throw new Error("unable to add bookmark");
    }

    //NOTE RE-check this!!!
    const newDoc: any = await updateDoc(doc(db, "users", id), {
      bookmarks: arrayRemove(id), // removes "1" from the array
    });
    return newDoc;
  } catch (error) {
    return "unable to add bookmark:" + error;
  }
};
