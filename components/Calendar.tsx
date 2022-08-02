import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { deflateRawSync } from "zlib";

const Calendar = () => {
  let today = dayjs();
  let todayNumber = dayjs().get("day");
  let startDay = today.subtract(todayNumber, "day");
  // let endDay = startDay.add(6, "day");
  let sun = startDay;
  let mon = startDay.add(1, "day");
  let tue = startDay.add(2, "day");
  let wed = startDay.add(3, "day");
  let thu = startDay.add(4, "day");
  let fri = startDay.add(5, "day");
  let sat = startDay.add(6, "day");

  const [days, setDays] = useState([sun, mon, tue, wed, thu, fri, sat]);

  const getMonth = () => {
    if (days[0].get("year") !== days[6].get("year")) {
      return days[0].format("YYYY.MM") + " ~ " + days[6].format("YYYY.MM");
    } else if (days[0].get("month") !== days[6].get("month")) {
      return days[0].format("YYYY.MM") + " ~ " + days[6].format("MM");
    } else {
      return days[0].format("YYYY.MM");
    }
  };
  const [selected, setSelected] = useState("");

  const changeColor = () => {
    setSelected("w-[3.25rem] h-[1.625rem] bg-primary rounded-[0.313rem]");
  };

  const goToLastWeek = () => {
    setDays((preDays) => {
      return preDays.map((day) => day.subtract(7, "day"));
    });
    // setMonth((day) => day.subtract(7, "day"));
  };

  const goToNextWeek = () => {
    setDays((nextDays) => {
      return nextDays.map((day) => day.add(7, "day"));
    });
    // setMonth((day) => day.add(7, "day"));
  };

  // console.log(sun);

  return (
    <>
      <div className="m-10 flex align-middle h-12">
        <button className=" w-[6.125rem] h-12 shadow-md rounded-3xl">
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
        <div>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="mx-2 text-[#4E515D]"
            onClick={goToLastWeek}
          />
          <FontAwesomeIcon
            icon={faAngleRight}
            className="mx-2 text-[#4E515D]"
            onClick={goToNextWeek}
          />
        </div>
        <div className="text-3xl text-[#4E515D]">{getMonth()}</div>
      </div>
      <div className="shadow-md m-10 rounded-2xl w-[67.806rem]">
        <table className="w-[67.806rem] h-[53.983rem]">
          <tbody>
            <tr>
              <td></td>
              {days.map((day, index) => {
                return (
                  <td
                    key={DAYS[index].id}
                    className="h-20 w-32 text-center border-b border-l border-solid border-gray-200"
                  >
                    <div className="">
                      <span className=" mr-2 text-base">{day.get("date")}</span>
                      <span className="text-[#BBBBC6] font-normal text-sm">
                        {DAYS[index].day}
                      </span>
                    </div>
                  </td>
                );
              })}
            </tr>
            {TIME.map((time) => {
              return (
                <tr key={time.id}>
                  <th className="border-solid border-gray-200 border-r font-thin text-[0.625rem] text-[#AAADB8] align-top w-[2.713rem]">
                    {time.time}
                  </th>
                  <th className="boreder-solid border-gray-200 border"></th>
                  <th className="boreder-solid border-gray-200 border"></th>
                  <th className="boreder-solid border-gray-200 border"></th>
                  <th className="boreder-solid border-gray-200 border"></th>
                  <th className="boreder-solid border-gray-200 border"></th>
                  <th className="boreder-solid border-gray-200 border"></th>
                  <th className="boreder-solid border-gray-200 border border-r-0"></th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

const DAYS: { id: number; day: string }[] = [
  { id: 1, day: "일" },
  { id: 2, day: "월" },
  { id: 3, day: "화" },
  { id: 4, day: "수" },
  { id: 5, day: "목" },
  { id: 6, day: "금" },
  { id: 7, day: "토" },
];

const TIME = [
  { id: 1, time: "06:00" },
  { id: 2, time: "07:00" },
  { id: 3, time: "08:00" },
  { id: 4, time: "09:00" },
  { id: 5, time: "10:00" },
  { id: 6, time: "11:00" },
  { id: 7, time: "12:00" },
  { id: 8, time: ":1300" },
  { id: 9, time: "14:00" },
  { id: 10, time: "15:00" },
  { id: 11, time: ":16:00" },
  { id: 12, time: "17:00" },
  { id: 13, time: "18:00" },
];

export default Calendar;
