import dayjs from "dayjs";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Calendar = () => {
  let thisMonth = dayjs().format("YYYY.MM");
  let today = dayjs();
  let todayNumber = dayjs().get("day");
  let Sun = today.subtract(todayNumber, "day");
  let Sat = Sun.add(6, "day");
  console.log(Sat.get("date"));
  return (
    <>
      <div className="m-10 flex justify-between  w-[300px]">
        <button className=" w-[98px] h-[48px] shadow-md rounded-3xl">
          <div className="flex my-[14px] mx-[20px]">
            <Image
              src="/images/calendar_icon.png"
              alt="아이콘"
              width={20}
              height={20}
            />
            <div className="text-[#7165DB] mx-[5px] font-normal">오늘</div>
          </div>
        </button>
        <div>
          <FontAwesomeIcon icon={faAngleLeft} className="mx-2 text-[#4E515D]" />
          <FontAwesomeIcon
            icon={faAngleRight}
            className="mx-2 text-[#4E515D]"
          />
        </div>
        <div className="text-3xl text-[#4E515D]">{thisMonth}</div>
      </div>
      <div className="shadow-md m-10 rounded-2xl w-[1084.900px]">
        <table className="w-[1084.9px] h-[863px]">
          <tbody>
            <tr>
              <td className="border-r border-solid border-gray-200"></td>
              {DAYS.map((day) => {
                return (
                  <td
                    key={day.id}
                    className="h-[80px] text-[#BBBBC6] font-normal text-sm text-center border-b border-solid border-gray-200"
                  >
                    {day.day}
                  </td>
                );
              })}
            </tr>
            {TIME.map((time) => {
              return (
                <tr key={time.id}>
                  <th className="border-solid border-gray-200 border-r font-thin text-xs text-[#AAADB8] align-top w-[70px]">
                    {time.time}
                  </th>
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

{
  /* <div className="display grid">{monthArr.map((el) => {})}</div>; */
}
