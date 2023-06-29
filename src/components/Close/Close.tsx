import {} from "react";
import { IoClose } from "react-icons/io5";

const Close = ({ close }: CloseType) => {
  return (
    <button
      className={
        "text-3xl text-gray-600 active:scale-90 transition-all duration-150 hover:scale-110"
      }
      onClick={() => close()}
      title="close"
    >
      <IoClose />
    </button>
  );
};

export default Close;
