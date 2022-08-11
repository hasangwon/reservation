import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { setNameFormat } from "./nameFormatter";

interface VetfluxLabelAndSelectOptionInterface {
  label: string;
  optionList: Array<unknown>;
  handleItemClick?: (event: { target: { value: unknown } }) => void;
  handleeClickToggleOption?: any;
  isShownDropDown?: boolean;
  value: string;
  readOnly?: boolean;
}

const VetfluxLabelAndSelectOption = ({ label = "제목을 입력해주세요.", optionList, handleItemClick, handleeClickToggleOption, isShownDropDown, value, readOnly = true }: VetfluxLabelAndSelectOptionInterface) => {
  return (
    <>
      <div className="relative flex items-center justify-center w-full text-left">
        {isShownDropDown && !readOnly && <Menus optionList={optionList} handleItemClick={handleItemClick} label={label} />}
        <div className="flex row items-center justify-between w-full group">
          <label htmlFor={label} className="w-full text-[.8125rem] text-[#808495] hover:cursor-pointer pl-0 pt-[.1875rem]">
            {label}
          </label>
          <button
            type="button"
            className={
              "flex items-center justify-between w-full h-[3.25rem] mt-[7px] text-base font-medium bg-white dark:bg-white group-hover:bg-zircon border border-[#e9e9f0] rounded-md focus:outline-none input-shadow transition ease-in-out focus:border-primary " +
              (!readOnly ? "text-[#4d4f5c]" : "text-[#b0aebc]")
            }
            id={label}
            onClick={handleeClickToggleOption}
          >
            {value.toString() ? value : setNameFormat(label, "을/를") + " 선택해주세요."}
            <svg xmlns="http://www.w3.org/2000/svg" id="Icon" width={30} height={30} viewBox="0 0 30 30" className={"transition transform fill-current text-[#b0aebc] " + (isShownDropDown && !readOnly ? "rotate-180" : "rotate-0")}>
              <defs>
                <clipPath id="clip-path">
                  <path id="Mask" d="M8 6.586L14.293.293a1 1 0 0 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1.707.293z" className="cls-1" />
                </clipPath>
                <style
                  dangerouslySetInnerHTML={{
                    __html: "\n            .cls-1{fill:#6c5ce7}.cls-2{fill:none}\n        ",
                  }}
                />
              </defs>
              <path id="Icon_Chevron_Bottom_background" d="M0 0H30V30H0z" className="cls-2" />
              <g id="Icon_Chevron_Bottom">
                <path id="Grid" d="M0 0h30v30H0z" className="cls-2" />
                <path id="Mask-2" d="M8 6.586L14.293.293a1 1 0 0 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1.707.293z" className="hover:text-primary text-[#2c2738]-500 fill-current" transform="translate(7 11)" />
                <g id="Icon_Chevron_Bottom-2" clipPath="url(#clip-path)" transform="translate(7 11)">
                  <g id="Color" transform="translate(-7 -11)">
                    <path id="Icon_Fill_Accent" d="M0 0h30v30H0z" className="hover:text-primary text-[#2c2738]-500 fill-current" />
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

const Menus = ({ optionList, handleItemClick, label }: { optionList: any; handleItemClick: any; label: any }) => {
  return (
    <div className={"transition absolute right-0 bottom-12 z-50 mt-2 w-full bg-white rounded-md focus:outline-none shadow-lg origin-top ring-black ring-opacity-5 ring-1 " + "opacity-100"} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <div className="py-1 overflow-y-scroll max-h-64" role="none">
        {optionList.map((el: any, index: number) => (
          <button id={label} key={`${el}_${index}`} className="block px-4 py-2 w-full text-[#2c2738] text-left text-sm hover:bg-zircon" role="menuitem" value={el} onClick={handleItemClick}>
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};
export default VetfluxLabelAndSelectOption;
