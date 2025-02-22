import React, { useState } from "react";
import Image from "next/image";
import chevronDown from "@/public/image/chevron-down.svg";

interface FormDropDownProps {
  label?: string;
  name: string;
  options: { value: string }[];
  value: string | null;
  onSelect: (value: string) => void;
  placeholder: string;
}

export const FormDropDown: React.FC<FormDropDownProps> = ({
  label,
  name,
  options,
  value,
  onSelect,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOptionSelect = (value: string) => {
    setIsVisible(false);
    onSelect(value);
  };

  return (
    <div className="">
      <label htmlFor={name} className="dropdown-label">
        {label}
      </label>

      <div
        className="shadow-xs border-action-normal rounded-[8px] border px-4 py-[4px] outline-none flex justify-between"
        onClick={() => setIsVisible(!isVisible)}
      >
        <p className="text-xs font-bold">{value ? value : placeholder}</p>
        <Image
          src={chevronDown}
          alt="Toggle Dropdown"
          width={14}
          height={14}
          className={` ${
            isVisible
              ? "rotate-[-180deg] transform duration-200 ease-linear"
              : "transform duration-200 ease-linear"
          }`}
        />
      </div>

      {isVisible && (
        <div className="mt-2 flex flex-col max-h-60 overflow-y-auto rounded-md border bg-white shadow">
          {options.map((option) => (
            <div
              key={option.value}
              className="border-b px-3 py-[6px] text-xs font-semibold hover:bg-red-50 hover:text-red-500 cursor-pointer"
              onClick={() => handleOptionSelect(option.value)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
