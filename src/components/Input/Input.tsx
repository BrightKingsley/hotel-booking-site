import { type } from "os";
import React, { ChangeEventHandler, useEffect, useState } from "react";
// import RangeSlider from "react-range-slider-input/dist/components/RangeSlider";
// import RangeSlider from "react-range-slider-input";
// import "./RangeInput.css";
import MySelect from "react-select";

type RangeInput = {
  getRangeValue?: Function;
  setRangeValue?: Function;
  min?: number;
  max?: number;
  step?: number;
};

type CheckboxInput = {
  label: string;
};

type SelectType = {
  options?: string[];
  getSelected?: Function;
  selected?: string;
  placeholder?: string;
};

type NormalInputType = {
  getValue?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  index?: number;
  name?: string;
  hide?: boolean;
  value?: string;
};

type TextAreaType = {
  value?: string;
  name?: string;
  getValue?: ChangeEventHandler<HTMLTextAreaElement>;
};

type ImageInputType = {
  value?: string;
  multiple?: boolean;
  index?: number;
  getImages?: Function;
  name?: string;
  hide?: boolean;
};

interface InputType
  extends RangeInput,
    CheckboxInput,
    SelectType,
    ImageInputType,
    NormalInputType {
  type?: string;
  children?: React.ReactNode;
  className?: string;
  value: string;
  setValue?: Function;
  index: number;
  onClick?: any;
}

let currIndex: number;

export default function Input({
  type,
  name,
  hide,
  children,
  className,
  getImages,
  value,
  setValue,
  multiple,
  index,
  onClick,
  getRangeValue,
  setRangeValue,
  min,
  max,
  step,
  options,
  placeholder,
  selected,
}: InputType) {
  const getValue = (e: any) => {
    setValue && setValue(e.target.value);
  };

  const [inputType, setInputType] = useState();

  switch (type) {
    case "text" || "number":
      return (
        <NormalInput
          getValue={getValue}
          hide={hide}
          name={name}
          index={index}
          value={value}
          type={type}
          placeholder={placeholder}
        />
      );

    case "textarea":
      return <TextArea name={name} value={value} getValue={getValue} />;

    case "image":
      return (
        <ImageInput
          name={name}
          value={value}
          getImages={getImages}
          multiple={multiple}
          index={index}
          hide={hide}
        />
      );

    case "select":
      <Select
        getSelected={getSelection}
        options={options}
        placeholder={placeholder}
        selected={selected}
      />;

    default:
      return (
        <NormalInput
          getValue={getValue}
          hide={hide}
          name={name}
          index={index}
          value={value}
          type={type}
          placeholder={placeholder}
        />
      );
      break;
  }

  return (
    <div className={` ${className} bg-body outline-primary p-2`}>
      <label
        onClick={() => {
          console.log("This=>", index);
          currIndex = index;
        }}
        htmlFor={name}
      >
        {children}
      </label>
    </div>
  );
}

function TextArea({ name, value, getValue }: TextAreaType) {
  return (
    <textarea
      value={value}
      name={name}
      onChange={getValue}
      id=""
      rows={5}
      className=" bg-indigo-50 resize-none border-none outline-none p-2 pt-3 w-full focus:outline-2 focus:outline-primary focus:-outline-offset-4"
    />
  );
}

function NormalInput({ value, getValue, name, hide, type }: NormalInputType) {
  return (
    <input
      value={value}
      onChange={getValue}
      name={name}
      id={name}
      type={type}
      min={0}
      accept="image/*"
      style={{ display: hide ? "none" : "contents" }}
    />
  );
}

function ImageInput({
  value,
  multiple,
  index,
  getImages,
  name,
  hide,
}: ImageInputType) {
  return (
    <input
      value={value}
      name={name}
      id={name}
      type="images"
      min={0}
      accept="image/*"
      multiple={multiple}
      onInput={(e) => {
        getImages(
          // @ts-ignore
          Object.values(e.target.files).map((image) => image),
          currIndex
        );
      }}
      style={{ display: hide ? "none" : "contents" }}
    />
  );
}

// function RangeInput({
//   getRangeValue,
//   setRangeValue,
//   min,
//   max,
//   step,
// }: RangeInput) {
//   return (
//     <RangeSlider
//       min={min}
//       max={max}
//       step={step}
//       value={setRangeValue}
//       onInput={(e: []) => getRangeValue(e)}
//     />
//   );
// }

// function Checkbox({ label }: CheckboxInput) {
//   return (
//     <div className="">
//       <input type="checkbox" onChange={() => {}} />
//       <label htmlFor="con">
//         <small> {label}</small>
//       </label>
//     </div>
//   );
// }

function Select({ options, getSelected, selected, placeholder }: SelectType) {
  return (
    <MySelect
      styles={{
        control: (baseStyles: {}, state: any) => {
          return {
            ...baseStyles,
            "&:hover": { borderColor: "#0b947e" },
            borderColor: state.mouseOver ? "#0b947e" : "transparent",
            outline: "none",
            width: "100%",
            padding: 0,
            cursor: "pointer",
          };
        },
      }}
      theme={(theme: any) => {
        return {
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#e1fdf8",
            primary: "#0b947e",
          },
          spacing: {
            controlHeight: 30,
            menuGutter: 8,
            baseUnit: 2,
          },
        };
      }}
      defaultValue={options[0]}
      options={options}
      placeholder={placeholder}
      onChange={(e: any) => getSelected(e.value)}
      // value={selected}
    />
  );
}
