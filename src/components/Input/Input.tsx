import { type } from "os";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
//@ts-ignore
import RangeSlider from "react-range-slider-input";
import "./rangeInputStyles.css";
import Select from "react-select";
import { PRIMARY_COLOR } from "@/constants";

type RangeInputType = {
  getRangeValue?: Function;
  rangeValue?: [number, number];
  min?: number;
  max?: number;
  step?: number;
};

type SelectType = {
  options?: { value: string; label: string }[];
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

type CheckboxType = {
  label: string;
  value: string;
  getValue?: ChangeEventHandler<HTMLInputElement>;
};

interface InputType
  extends RangeInputType,
    CheckboxType,
    SelectType,
    ImageInputType,
    NormalInputType {
  type?: "text" | "range" | "textarea" | "image" | "select" | "checkbox";
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
  rangeValue,
  min,
  max,
  step,
  options,
  placeholder,
  selected,
  label,
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

    case "range":
      return (
        <RangeInput
          getRangeValue={getRangeValue}
          rangeValue={rangeValue}
          min={min}
          max={max}
          step={step}
        />
      );

    case "select":
      return (
        <MySelect
          getSelected={getSelection}
          options={options}
          placeholder={placeholder}
          selected={selected}
        />
      );

    case "checkbox":
      <Checkbox getValue={getValue} label={label} value={value} />;

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

  // return (
  //   <div className={` ${className} bg-body outline-primary p-2`}>
  //     <label
  //       onClick={() => {
  //         console.log("This=>", index);
  //         currIndex = index;
  //       }}
  //       htmlFor={name}
  //     >
  //       {children}
  //     </label>
  //   </div>
  // );
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
        getImages &&
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

function RangeInput({
  getRangeValue,
  rangeValue,
  min,
  max,
  step,
}: RangeInputType) {
  return (
    <div className="rangeSlider">
      <RangeSlider
        min={min}
        max={max}
        step={step}
        value={rangeValue}
        onInput={(e: []) => getRangeValue && getRangeValue(e)}
      />
    </div>
  );
}

function MySelect({ options, getSelected, selected, placeholder }: SelectType) {
  return (
    <Select
      className=""
      styles={{
        control: (baseStyles: {}, state: any) => {
          return {
            ...baseStyles,
            "&:hover": { borderColor: PRIMARY_COLOR(1) },
            borderColor: state.mouseOver ? PRIMARY_COLOR(1) : "transparent",
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
            primary25: PRIMARY_COLOR(0.1),
            primary: PRIMARY_COLOR(1),
            primary50: PRIMARY_COLOR(0.5),
          },
          spacing: {
            controlHeight: 30,
            menuGutter: 8,
            baseUnit: 2,
          },
        };
      }}
      defaultValue={options && options[0]}
      options={options}
      placeholder={placeholder}
      onChange={(e: any) => getSelected && getSelected(e.value)}
      // value={selected}
    />
  );
}

function Checkbox({ label, value, getValue }: CheckboxType) {
  return (
    <div className={""}>
      <input
        type="checkbox"
        value={value}
        //NOTE check type
        onChange={(e: any) => {
          getValue && getValue(e.target.value);
        }}
      />
      {/* NOTE  check this */}
      <label htmlFor="con">
        <small> {label}</small>
      </label>
    </div>
  );
}
