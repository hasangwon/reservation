import dayjs from "dayjs";
import { MouseEventHandler, useContext, useEffect, useRef, useState } from "react";

type optionDirectionType = "top" | "bottom";

const VetfluxDropdownsTime = ({
  defaultValue = "이름 없음",
  list = ["1", "2", "3", "4"],
  currentValue,
  selectedDate,
  suffix,
  handleListToggle,
  handleListItemClick,
  isShownList,
  className,
  optionDirection = "top",
}: {
  defaultValue: string;
  list: string[] | number[];
  currentValue?: number | string;
  selectedDate?: number;
  suffix?: string;
  handleListToggle?: () => void;
  handleListItemClick?: MouseEventHandler<HTMLButtonElement>;
  isShownList?: boolean;
  className?: string;
  optionDirection?: optionDirectionType;
}) => {
  useEffect(() => {
    console.log(currentValue);
  }, [currentValue]);
  return (
    <>
      <div className={"relative inline-block w-full text-left "}>
        {isShownList && <Menus list={list} selectedDate={selectedDate} isShownList={isShownList} handleListCancel={handleListToggle} handleListItemClick={handleListItemClick} suffix={suffix} optionDirection={optionDirection} />}
        <div className={"flex items-center justify-between w-full group "}>
          <button
            type="button"
            className={
              "flex justify-between items-center flex-1 min-w-full px-4 py-2 text-base font-medium transition ease-in-out bg-white border rounded-md shadow-sm text-trout group-hover:bg-zircon border-whisper focus:outline-none focus:ring-primary focus:ring-offset-gray-100 focus:ring-offset-2 focus:ring-2 " +
              className
            }
            id="options-menu"
            aria-expanded="true"
            onClick={handleListToggle}
          >
            {currentValue ? currentValue : defaultValue}
            <svg xmlns="http://www.w3.org/2000/svg" id="Icon" width={20} height={20} viewBox="0 0 30 30" className={"transition transform fill-current text-trout-500 " + (isShownList ? "rotate-180" : "rotate-0")}>
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
                <path id="Mask-2" d="M8 6.586L14.293.293a1 1 0 0 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1.707.293z" className="fill-current hover:text-primary text-trout-500" transform="translate(7 11)" />
                <g id="Icon_Chevron_Bottom-2" clipPath="url(#clip-path)" transform="translate(7 11)">
                  <g id="Color" transform="translate(-7 -11)">
                    <path id="Icon_Fill_Accent" d="M0 0h30v30H0z" className="fill-current hover:text-primary text-trout-500" />
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

const Menus = ({ list, isShownList, selectedDate, handleListCancel, handleListItemClick, suffix, optionDirection }: { list: any; isShownList: any; selectedDate: any; handleListCancel: any; handleListItemClick: any; suffix: any; optionDirection: any }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      // 처리할 내용 넣기
      event.stopPropagation();
      handleListCancel();
    }
  };
  useEffect(() => {
    if (isShownList) {
      setIsLoaded(true);
    }
    // console.log(list);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      // document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, isShownList, list]);
  return (
    <div
      ref={ref}
      className={"transition absolute right-0 z-50 mt-6 w-full bg-white rounded-md focus:outline-none shadow-lg origin-top ring-black ring-opacity-5 ring-1 " + (isLoaded ? "opacity-100 " : "opacity-0 ") + (optionDirection === "top" ? "bottom-8" : "top-0")}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="py-1 overflow-y-scroll max-h-64" role="none">
        {list.map((value: string, index: number) => {
          return (
            <button key={value + String.fromCharCode(index) + "/"} className={`block w-full px-4 py-2 text-sm hover:bg-zircon text-trout`} role="menuitem" value={value} onClick={handleListItemClick}>
              {suffix ? value + suffix : value}
            </button>
          );
          // const isSameDate =
          //   dayjs(selectedDate).format('YYYY.MM.DD') ===
          //   dayjs().format('YYYY.MM.DD');
          // const thisTime = dayjs(
          //   `${dayjs(selectedDate).format('YYYY.MM.DD')} ${value}`,
          // ).valueOf();
          // const nowDateTime = dayjs().add(-1, 'hour').valueOf();
          // return isSameDate ? (
          //   nowDateTime < thisTime && (
          //     <button
          //       key={value + String.fromCharCode(index) + '/'}
          //       className='block w-full px-4 py-2 text-sm text-trout hover:bg-zircon'
          //       role='menuitem'
          //       value={value}
          //       onClick={handleListItemClick}
          //     >
          //       {suffix ? value + suffix : value}
          //     </button>
          //   )
          // ) : (
          //
          // );
        })}
      </div>
    </div>
  );
};
export default VetfluxDropdownsTime;
