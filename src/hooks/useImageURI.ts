import React, { ChangeEvent, useState } from "react";

export default function useImageURI(e: ChangeEvent<HTMLInputElement>) {
  const [imageURI, setImageURI] = useState<
    string | ArrayBuffer | null | undefined
  >();
  if (e.target.files && e.target.files[0]) {
    let result;
    let reader = new FileReader();

    reader.onload = function (ev: ProgressEvent<FileReader>) {
      setImageURI(ev.target?.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  console.log(imageURI);
  return imageURI;
}
