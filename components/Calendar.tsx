import dayjs, { Dayjs } from "dayjs";
import ReservationContainer from "./ReservationContainer";

interface propsType {
  days: Dayjs[];
  selectedDate: string;
  setSelectedDate: any;
  events: CalendarEventType;
}

export interface CalendarEventType {
  [index: string]: any;
}

const Calendar = ({ days, selectedDate, setSelectedDate, events }: propsType) => {
  return (
    <div className="shadow-md rounded-2xl w-full h-full bg-white flex flex-col overflow-y-scroll">
      <div className="h-full">
        <table className="w-full h-full">
          <thead className="sticky top-0 bg-white">
            <tr>
              <td className="h-[5rem] "></td>
              {days.map((day: Dayjs, index: number) => {
                return (
                  <td
                    key={DAYS[index].id}
                    className="w-[9.365rem] text-center border-l border-solid border-[#e9e9f0] align-top"
                    onClick={() => {
                      setSelectedDate(day.format("YYYY-MM-DD"));
                    }}
                  >
                    <button value={index} className={selectedDate === day.format("YYYY-MM-DD") ? "w-[3.25rem] h-[1.625rem] bg-[#6c5ce7] rounded-[0.313rem] mt-2" : "mt-2 h-[1.625rem]"}>
                      <span className={selectedDate === day.format("YYYY-MM-DD") ? "mr-2 text-sm text-white" : "mr-2 text-sm text-[#4d4f5c]"}>{day.get("date")}</span>
                      <span className={selectedDate === day.format("YYYY-MM-DD") ? "text-white font-normal text-sm" : "text-[#b0aebc] font-normal text-sm"}>{DAYS[index].day}</span>
                    </button>
                    {dayjs().format("YYYY.MM.DD") === day.format("YYYY.MM.DD") ? (
                      <div className="relative">
                        <div className="w-full absolute top-[1.7rem]">
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
          </thead>

          <tbody>
            {TIME.map((time) => {
              return (
                <tr key={time.id}>
                  <th className="w-[5%] font-normal text-[0.625rem] text-[#808495] align-top h-[5rem]">{time.time}</th>
                  {days.map((day, i) => {
                    return (
                      <th className="border-solid border-[#e9e9f0] border-l border-t f" key={i}>
                        <ReservationContainer events={events[day.format("YYYY-MM-DD")] ? events[day.format("YYYY-MM-DD")][time.time] : []} />
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

const TIME: { id: number; time: string }[] = [
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

export default Calendar;
