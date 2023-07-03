// import {
//   arrayUnion,
//   doc,
//   onSnapshot,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "@/api";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { v4 as uuid } from "uuid";

// export const getMessages = (data: any, setMessages: Function) => {
//   const unsub = onSnapshot(doc(db, "messsages", data.chatId), (doc) => {
//     doc.exists() && setMessages(doc.data().messages);
//   });

//   return () => {
//     unsub();
//   };
// };

// export const getChats = (user: User, setChats: Function) => {
//   const unsub = onSnapshot(
//     doc(db, "chats", user && user.uid ? user.uid : ""),
//     (doc) => {
//       console.log(doc.data);
//       doc.exists() && setChats(doc.data());
//     }
//   );

//   return () => {
//     unsub();
//   };
// };

// export const handleSendMessage = async ({
//   img,
//   user,
//   text,
//   data,
//   setText,
//   setImg,
// }: {
//   img: Blob | Uint8Array | ArrayBuffer | null;
//   user: User | null;
//   text: string;
//   data: any;
//   setText: Function;
//   setImg: Function;
// }) => {
//   if (img) {
//     const storageRef = ref(storage, uuid());
//     //   const uploadTask = await uploadBytesResumable(storageRef, img);

//     await uploadBytesResumable(storageRef, img).then(() => {
//       getDownloadURL(storageRef).then(async (downloadURL) => {
//         await updateDoc(doc(db, "chats", data.chatId), {
//           messages: arrayUnion({
//             id: uuid(),
//             text: text ? text : null,
//             senderId: user?.uid,
//             date: Timestamp.now(),
//             img: downloadURL,
//           }),
//         });
//       });
//     });
//   } else {
//     await updateDoc(doc(db, "chats", data.chatId), {
//       messages: arrayUnion({
//         id: uuid(),
//         text,
//         senderId: user?.uid,
//         date: Timestamp.now(),
//       }),
//     });
//   }

//   setText("");
//   setImg(null);

//   await updateDoc(doc(db, "userChats", user && user.uid ? user?.uid : ""), {
//     [data.chatId + ".lastMessage"]: {
//       text,
//     },
//     [data.chatId + ".date"]: serverTimestamp(),
//   });

//   await updateDoc(doc(db, "userChats", data.user.uid), {
//     [data.chatId + ".lastMessage"]: {
//       text,
//     },
//     [data.chatId + ".date"]: serverTimestamp(),
//   });
// };
