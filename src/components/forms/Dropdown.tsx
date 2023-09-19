import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../docs/assets/Logotipo.png";

export interface DropdownOption {
  label: string;
  value: string;
  onClick: () => void;
}

interface Props {
  title: string;
  options?: DropdownOption[];
  changeTitle?: boolean;
}

export const Dropdown = (props: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [optionSelected, setOptionSelected] = useState<string | null>(null);

  const changeTitle = props.changeTitle || true;

  useEffect(() => {
    function closeOptions(e: MouseEvent) {
      e.preventDefault();

      if (e.target === document.getElementById("menu-button")) return;
      setShowOptions(false);
    }

    document.body.addEventListener("click", closeOptions);
  }, []);

  // active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-strong"
  return (
    <div className="relative inline-block w-full">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(!showOptions);
        }}
        className={`inline-flex w-full justify-between gap-x-1.5 rounded-md outline-none
            bg-white px-3 py-3 ${
              optionSelected ? "font-semibold text-gray-900" : "text-gray-500"
            }  shadow-sm ring-2 hover:bg-gray-50
            hover:ring-[3px] ring-primary-strong ring-offset-2 ring-offset-gray-100  focus:ring-4 active:ring-4}`}
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {optionSelected && changeTitle ? optionSelected : props.title}
        <svg
          className="-mr-1 ml-2 h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </button>

      {showOptions && (
        <section
          className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg 
            ring-1 ring-secondary-normal ring-opacity-5  "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1 px-2">
            {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
            {props.options?.map((option, index) => (
              <button
                key={index}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    option.onClick();
                    setOptionSelected(option.value);
                    setShowOptions(false);
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  option.onClick();
                  setOptionSelected(option.value);
                }}
                className="text-gray-700 block w-full px-4 py-2 text-left text-sm outline-none rounded-md
                  hover:bg-gray-100 active:font-semibold active:text-gray-900 focus:ring-2 focus:ring-primary-strong"
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
