import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ReservationItem from "./ReservationItem";
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

  const [thisDate, setThisDate] = useState(today);
  const [selected, setSelected] = useState(false);
  const [className, setClassName] = useState("");
  const [purpose, setPurpose] = useState([]);

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

  console.log(today);
  console.log(wed);

  return (
    <>
      <div className="m-10 flex items-center h-12">
        <button className=" w-[6.125rem] h-12 shadow-md rounded-3xl mx-3 bg-white">
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
      <div className="shadow-md m-10 rounded-2xl w-[67.806rem] bg-white flex">
        <div>
          <div className="h-[4.688rem]"></div>
          {TIME.map((time) => {
            return (
              <div
                key={time.id}
                className="font-normal text-[0.625rem] text-[#808495] align-top w-[2.3rem] h-[3.75rem] ml-3"
              >
                {time.time}
              </div>
            );
          })}
        </div>
        <table className="w-[67.806rem] h-[53.983rem]">
          <tbody>
            <tr>
              <td></td>
              {days.map((day, index) => {
                return (
                  <td
                    key={DAYS[index].id}
                    className="h-20 w-32 text-center border-b border-l border-solid border-[#e9e9f0]"
                  >
                    <div>
                      <span className=" mr-2 text-sm text-[#4d4f5c]">
                        {day.get("date")}
                      </span>
                      <span className="text-[#b0aebc] font-normal text-sm">
                        {DAYS[index].day}
                      </span>
                    </div>
                    {today.format("YYYY.MM.DD") === day.format("YYYY.MM.DD") ? (
                      <div className="absolute">
                        <div className="mt-3 w-[9.1rem]">
                          <div className="text-xs text-[#6c5ce7]">Today</div>
                          <div className="border-b-[0.188rem] border-[#6C5CE7]"></div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                );
              })}
            </tr>
            {TIME.map((time) => {
              return (
                <tr key={time.id} className="h-[3.625rem]">
                  <th className="border-solid border-[#e9e9f0] border-r font-thin text-[0.625rem] text-[#AAADB8] align-top w-0">
                    {/* {time.time} */}
                  </th>
                  {days.map((day, i) => {
                    return (
                      <th
                        className="boreder-solid border-[#e9e9f0] border-l border-t"
                        key={i}
                      >
                        <div className="flex w-[8rem] flex-wrap">
                          {RESERVATION.map((res): any => {
                            if (
                              res.date === day.format("YYYY-MM-DD") &&
                              res.time === time.time
                            ) {
                              return (
                                <ReservationItem
                                  purpose={res.purpose}
                                  id={res.id}
                                  petName={res.pet_name}
                                />
                              );
                            }
                          })}
                        </div>
                      </th>
                    );
                  })}
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
  { id: 8, time: "13:00" },
  { id: 9, time: "14:00" },
  { id: 10, time: "15:00" },
  { id: 11, time: "16:00" },
  { id: 12, time: "17:00" },
  { id: 13, time: "18:00" },
];

const RESERVATION: {
  id: number;
  time: string;
  date: string;
  pet_name: string;
  purpose: string;
}[] = [
  {
    id: 1,
    time: "10:00",
    date: "2022-08-01",
    pet_name: "더미",
    purpose: "진료 예약",
  },
  {
    id: 2,
    time: "11:00",
    date: "2022-08-03",
    pet_name: "벨",
    purpose: "수술 예약",
  },
  {
    id: 3,
    time: "06:00",
    date: "2022-08-06",
    pet_name: "두부",
    purpose: "미용 예약",
  },
  {
    id: 4,
    time: "13:00",
    date: "2022-08-05",
    pet_name: "뽀삐",
    purpose: "기타 예약",
  },
  {
    id: 5,
    time: "13:00",
    date: "2022-08-05",
    pet_name: "커피",
    purpose: "수술 예약",
  },
  {
    id: 6,
    time: "13:00",
    date: "2022-08-07",
    pet_name: "윌리",
    purpose: "진료 예약",
  },
  {
    id: 7,
    time: "12:00",
    date: "2022-07-31",
    pet_name: "희융이",
    purpose: "미용 예약",
  },
  {
    id: 8,
    time: "13:00",
    date: "2022-08-05",
    pet_name: "꾸뭉이",
    purpose: "진료 예약",
  },
  {
    id: 9,
    time: "06:00",
    date: "2022-07-30",
    pet_name: "해피",
    purpose: "기타 예약",
  },
];

export default Calendar;
