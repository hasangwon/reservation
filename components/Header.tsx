import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Header = ({ days, setDays, clickTodayButton }) => {
  const getMonth = () => {
    if (days[0].get("year") !== days[6].get("year")) {
      return days[0].format("YYYY.MM") + " ~ " + days[6].format("YYYY.MM");
    } else if (days[0].get("month") !== days[6].get("month")) {
      return days[0].format("YYYY.MM") + " ~ " + days[6].format("MM");
    } else {
      return days[0].format("YYYY.MM");
    }
  };

  const goToLastWeek = () => {
    setDays((days) => {
      return days.map((day) => day.subtract(7, "day"));
    });
  };

  const goToNextWeek = () => {
    setDays((days) => {
      return days.map((day) => day.add(7, "day"));
    });
  };

  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center h-12 mb-10">
        <button
          className=" w-[6.125rem] h-12 shadow-md rounded-3xl mr-3 bg-white"
          onClick={clickTodayButton}
        >
          <div className="flex my-3.5 mx-5">
            <Image
              src="/images/calendar_icon.png"
              alt="아이콘"
              width={20}
              height={20}
            />
            <div className="text-[#7165DB] mx-[0.313rem] font-normal">오늘</div>
          </div>
        </button>
        <div className="mx-3">
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="mr-[0.7rem] text-[#4E515D]"
            onClick={goToLastWeek}
          />
          <FontAwesomeIcon
            icon={faAngleRight}
            className="ml-[0.7rem] text-[#4E515D]"
            onClick={goToNextWeek}
          />
        </div>
        <div className="text-3xl text-[#4E515D] mx-3">{getMonth()}</div>
      </div>
      <button className="mx-5 w-[8.75rem] h-12 bg-[#6c5ce7] text-white rounded-md">
        + 새 예약 만들기
      </button>
    </div>
  );
};

export default Header;
