import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/api";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";

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
    if (image) {
      const storageRef = ref(storage, "//uuid() or some random ID"); 

      //   const uploadTask = await uploadBytesResumable(storageRef, image);

      uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          newDoc = await updateDoc(doc(db, "users", uid), {
            image: downloadURL,
          });
        });
      });
      return newDoc;
    }
    if (bookmark) {
      newDoc = await updateDoc(doc(db, "users", uid), {
        bookmarks: arrayUnion(bookmark),
      });
      return newDoc;
    }
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

export class UpdateUser {
  _uid;
  _token;
  constructor({ uid, token }: { uid: string; token: string }) {
    this._uid = uid;
    this._token = token;
  }

  async addToBookmarks(id: string): Promise<User | string> {
    try {
      //add some logic to check if the id is a valid hotel id
      const docExists = true;
      if (!docExists) {
        return "unable to add bookmark";
      }

      //NOTE RE-check this!!!
      const newDoc: any = await updateDoc(doc(db, "users", this._uid), {
        bookmarks: arrayUnion(id),
      });
      return newDoc;
    } catch (error) {
      return "unable to add bookmark";
    }
  }

  // NOTE : Implement the delete functionality
  async removeFromBookmarks(id: string): Promise<User | string> {
    try {
      //add some logic to check if the id is a valid hotel id
      const docExists = true;
      if (!docExists) {
        return "unable to add bookmark";
      }

      //NOTE RE-check this!!!
      const newDoc: any = await updateDoc(doc(db, "users", this._uid), {
        bookmarks: arrayUnion(id),
      });
      return newDoc;
    } catch (error) {
      return "unable to add bookmark";
    }
  }
}
