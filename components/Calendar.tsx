import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReservationItem from "./ReservationItem";

const Calendar = ({ today, days, selectedDate, setSelectedDate }) => {
  const [thisDate, setThisDate] = useState(today);
  const [purpose, setPurpose] = useState([]);

  return (
    <div className="shadow-md rounded-2xl w-full h-full bg-white flex flex-col  overflow-y-scroll">
      <div>
        <table className="w-[67.806rem]">
          <tbody>
            <tr>
              <td className="w-[2.27rem] h-[5rem]"></td>
              {days.map((day, index: number) => {
                return (
                  <td
                    key={DAYS[index].id}
                    className="w-[9.175rem] text-center border-l border-solid border-[#e9e9f0]"
                    onClick={() => {
                      setSelectedDate(day.format("YYYY-MM-DD"));
                    }}
                  >
                    <button
                      value={index}
                      className={
                        selectedDate === day.format("YYYY-MM-DD")
                          ? "w-[3.25rem] h-[1.625rem] bg-[#6c5ce7] rounded-[0.313rem]"
                          : ""
                      }
                    >
                      <span
                        className={
                          selectedDate === day.format("YYYY-MM-DD")
                            ? "mr-2 text-sm text-white"
                            : "mr-2 text-sm text-[#4d4f5c]"
                        }
                      >
                        {day.get("date")}
                      </span>
                      <span
                        className={
                          selectedDate === day.format("YYYY-MM-DD")
                            ? "text-white font-normal text-sm"
                            : "text-[#b0aebc] font-normal text-sm"
                        }
                      >
                        {DAYS[index].day}
                      </span>
                    </button>
                    {today.format("YYYY.MM.DD") === day.format("YYYY.MM.DD") ? (
                      <div className="relative">
                        <div className="w-[9.25rem] absolute top-[10px]">
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
          </tbody>
        </table>
      </div>

      <div className="h-full overflow-y-scroll">
        <table className="w-[67.806rem]">
          <tbody>
            {TIME.map((time) => {
              return (
                <tr key={time.id}>
                  <th className="font-normal text-[0.625rem] text-[#808495] align-top w-[2.3rem] h-[3.75rem] ml-3">
                    {time.time}
                  </th>
                  {days.map((day, i) => {
                    return (
                      //높이에 고정값을 주면 align-start 적용이 가능하지만 그러면 반응형은...?
                      <th
                        className="border-solid border-[#e9e9f0] border-l border-t"
                        key={i}
                      >
                        <div className="flex w-[8rem] h-[3.75rem] flex-wrap items-start">
                          {RESERVATION.map(
                            (res: {
                              id: number;
                              time: string;
                              date: string;
                              pet_name: string;
                              purpose: string;
                            }) => {
                              let arr = [];
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
                            }
                          )}
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
    </div>
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
  { id: 1, time: "00:00" },
  { id: 2, time: "01:00" },
  { id: 3, time: "02:00" },
  { id: 4, time: "03:00" },
  { id: 5, time: "04:00" },
  { id: 6, time: "05:00" },
  { id: 7, time: "06:00" },
  { id: 8, time: "07:00" },
  { id: 9, time: "08:00" },
  { id: 10, time: "09:00" },
  { id: 11, time: "10:00" },
  { id: 12, time: "11:00" },
  { id: 13, time: "12:00" },
  { id: 14, time: "13:00" },
  { id: 15, time: "14:00" },
  { id: 16, time: "15:00" },
  { id: 17, time: "16:00" },
  { id: 18, time: "17:00" },
  { id: 19, time: "18:00" },
  { id: 20, time: "19:00" },
  { id: 21, time: "20:00" },
  { id: 22, time: "21:00" },
  { id: 23, time: "22:00" },
  { id: 24, time: "23:00" },
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
  {
    id: 10,
    time: "13:00",
    date: "2022-08-05",
    pet_name: "꼬미",
    purpose: "진료 예약",
  },
];

export default Calendar;
