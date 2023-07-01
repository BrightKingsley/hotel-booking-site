import { useState } from "react";

export default function Increment() {
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    setValue((prevValue) => (prevValue += 1));
  };
  const handleDecrement = () => {
    setValue((prevValue) => (prevValue > 1 ? (prevValue -= 1) : prevValue));
  };

  return (
    <div className="flex items-center justify-center">
      <span
        onClick={handleDecrement}
        className="bg-primary/10 w-5 h-5 flex items-center justify-center cursor-pointer rounded-sm active:scale-90 transition-all duration-200"
      >
        -
      </span>
      <small className="px-2">{value}</small>
      <span
        onClick={handleIncrement}
        className="bg-primary/10 w-5 h-5 flex items-center justify-center cursor-pointer rounded-sm active:scale-90 transition-all duration-200"
      >
        +
      </span>
    </div>
  );
}
