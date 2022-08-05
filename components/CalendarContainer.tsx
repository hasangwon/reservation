import Calendar from "./Calendar";
import Header from "./Header";
import dayjs, {Dayjs} from "dayjs";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ReservationItem from "./ReservationItem";

const CalendarContainer = () => {
  let today = dayjs();
  let todayNumber = dayjs().get("day");
  let startDay = today.subtract(todayNumber, "day");
  let sun = startDay;
  let mon = startDay.add(1, "day");
  let tue = startDay.add(2, "day");
  let wed = startDay.add(3, "day");
  let thu = startDay.add(4, "day");
  let fri = startDay.add(5, "day");
  let sat = startDay.add(6, "day");
  const [days, setDays] = useState<Dayjs[]>([sun, mon, tue, wed, thu, fri, sat]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const clickTodayButton = () => {
    setSelectedDate(today.format("YYYY-MM-DD"));
    setDays([
      startDay,
      startDay.add(1, "day"),
      startDay.add(2, "day"),
      startDay.add(3, "day"),
      startDay.add(4, "day"),
      startDay.add(5, "day"),
      startDay.add(6, "day"),
    ]);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <Header
        days={days}
        setDays={setDays}
        clickTodayButton={clickTodayButton}
      />
      <Calendar
        today={today}
        days={days}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default CalendarContainer;
