import { ChangeEvent } from "react";

let result: any;
export const readURI = async (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    let reader = new FileReader();

    reader.onload = await function (ev: ProgressEvent<FileReader>) {
      result = ev.target?.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    result && console.log(result);

    return result;
  }
};

/*
import { ChangeEvent } from "react";

export const readURI = (e: ChangeEvent<HTMLInputElement>) => {
  let result;
  if (e.target.files && e.target.files[0]) {
    let reader = new FileReader();

    reader.onload = function (ev: ProgressEvent<FileReader>) {
      result = ev.target?.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    return result;
  }
};
*/
