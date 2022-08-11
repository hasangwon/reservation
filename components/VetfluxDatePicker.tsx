/* eslint-disable jsx-a11y/no-onchange */
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import toObject from "dayjs/plugin/toObject";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
interface VetfluxDatePickerPropsType {
  handleDateData: (selectedDate: number) => void;
  handleDatePickerCancel: () => void;
  datePickRangeOptions: "normal" | "after" | "before";
  className: string;
  defaultTime: number;
}
const VetfluxDatePicker = ({ handleDateData, handleDatePickerCancel, datePickRangeOptions, className = "top-auto left-auto", defaultTime }: VetfluxDatePickerPropsType) => {
  dayjs.extend(toObject);
  dayjs.extend(calendar);
  dayjs.extend(weekday);
  dayjs.extend(duration);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Seoul");
  const today = dayjs(defaultTime).toObject();
  const [selectedDate, setSelectedDate] = useState(today);
  const [year, setYear] = useState(today.years);
  const [month, setMonth] = useState(today.months);
  const trArray = new Array(6).fill(1).map((column, columnIndex) =>
    new Array(7).fill(1).map((row, rowIndex) =>
      dayjs(`${selectedDate.years}-${selectedDate.months + 1}-01`)
        .startOf("week")
        .add(row + rowIndex + columnIndex * 7 - 1, "day")
        .toObject()
    )
  );
  const [calendarArray, setCalendarArray] = useState(trArray);
  let isDateBeforeCheck = false;
  let disabledCurrentYear: string;
  let disabledCurrentMonth: string;
  let disabledCurrentDate: string;
  let disabledSumResultDate: number;
  const handleCellClick: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    const { targetYear, targetMonth, targetDay } = event.currentTarget.dataset;
    const numberMonth = Number(targetMonth);
    setSelectedDate(dayjs(`${targetYear}-${numberMonth + 1}-${targetDay}`).toObject());
    handleDateData(new Date(`${targetYear}-${numberMonth + 1}-${targetDay}`).valueOf());
  };

  const handleMonthButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const result = event.currentTarget.value;
    const currentDate = dayjs(`${selectedDate.years}-${selectedDate.months + 1}-${selectedDate.date}`);
    if (result === "next") {
      const nextMonth = currentDate.add(1, "month").startOf("month");
      const newArray = new Array(6).fill(1).map((column, columnIndex) =>
        new Array(7).fill(1).map((row, rowIndex) =>
          nextMonth
            .startOf("week")
            .add(row + rowIndex + columnIndex * 7 - 1, "day")
            .toObject()
        )
      );
      setCalendarArray(newArray);
      setSelectedDate(nextMonth.toObject());
      if (month !== 11) {
        setMonth(month + 1);
      } else {
        setYear(year + 1);
        setMonth(0);
      }
    }
    if (result === "previous") {
      const previousMonth = currentDate.subtract(1, "month").startOf("month");
      const newArray = new Array(6).fill(1).map((column, columnIndex) =>
        new Array(7).fill(1).map((row, rowIndex) =>
          previousMonth
            .startOf("week")
            .add(row + rowIndex + columnIndex * 7 - 1, "day")
            .toObject()
        )
      );
      setCalendarArray(newArray);
      setSelectedDate(previousMonth.toObject());
      if (month !== 0) {
        setMonth(month - 1);
      } else {
        setYear(year - 1);
        setMonth(11);
      }
    }
  };
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback(
    (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleDatePickerCancel();
      }
    },
    [handleDatePickerCancel]
  );

  const afterDateDisabledChecker = (year: string, month: string, date: string) => {
    disabledSumResultDate = parseInt(year + month + date);

    if (dayjs(disabledSumResultDate.toString()).valueOf() < dayjs().add(-1, "day").valueOf()) {
      isDateBeforeCheck = true;
    } else {
      isDateBeforeCheck = false;
    }
  };

  const beforeDateDisabledChecker = (year: string, month: string, date: string) => {
    disabledSumResultDate = parseInt(year + month + date);
    isDateBeforeCheck = dayjs(disabledSumResultDate.toString()).valueOf() > dayjs().subtract(1, "day").valueOf();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      // document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [handleClickOutside]);
  return (
    <div className={"absolute z-40 p-6 bg-white shadow-xl rounded-3xl " + className} ref={ref}>
      <div className="flex justify-between mt-1">
        <button className="pl-5" onClick={handleMonthButton} value="previous">
          <svg xmlns="http://www.w3.org/2000/svg" width="9.771" height="14.454" viewBox="0 0 9.771 14.454">
            <g>
              <path fill="none" stroke="#808495" strokeWidth="2px" d="M1811.182 4362.342l-7.567 6.731 7.567 6.2" transform="translate(-251.96 -2179.753) translate(-1550.116 -2181.842)" />
            </g>
          </svg>
        </button>
        <p className="text-base text-trout">{year + "." + (month + 1)}</p>
        <button className="pr-5" onClick={handleMonthButton} value="next">
          <svg xmlns="http://www.w3.org/2000/svg" width="9.775" height="14.454" viewBox="0 0 9.775 14.454">
            <g>
              <path fill="none" stroke="#4d4f5c" strokeWidth="2px" d="M1803.616 4362.342l7.57 6.731-7.57 6.2" transform="translate(-253.402 -2179.753) translate(-1549.549 -2181.842)" />
            </g>
          </svg>
        </button>
      </div>
      <table className="mt-6 date-picker">
        <thead>
          <tr>
            <th>
              <div className="flex justify-center w-full">
                <p className="text-xs font-bold text-center opacity-50 dark:text-gray-400 text-spun-pearl-500">일</p>
              </div>
            </th>
            <th>
              <div className="flex justify-center w-full">
                <p className="text-xs font-bold text-center opacity-50 dark:text-gray-400 text-spun-pearl-500">월</p>
              </div>
            </th>
            <th>
              <div className="flex justify-center w-full">
                <p className="text-xs font-bold text-center opacity-50 dark:text-gray-400 text-spun-pearl-500">화</p>
              </div>
            </th>
            <th>
              <div className="flex justify-center w-full">
                <p className="text-xs font-bold text-center opacity-50 dark:text-gray-400 text-spun-pearl-500">수</p>
              </div>
            </th>
            <th>
              <div className="flex justify-center w-full">
                <p className="text-xs font-bold text-center opacity-50 dark:text-gray-400 text-spun-pearl-500">목</p>
              </div>
            </th>
            <th>
              <div className="flex justify-center w-full">
                <p className="text-xs font-bold text-center opacity-50 dark:text-gray-400 text-spun-pearl-500">금</p>
              </div>
            </th>
            <th>
              <div className="flex justify-center w-full">
                <p className="text-xs font-bold text-center opacity-50 dark:text-gray-400 text-spun-pearl-500">토</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {calendarArray?.map((row) => (
            <tr key={Math.random()}>
              {row.map((cellDate) => {
                /* 과거 날짜 선택 금지 규정 추가 */
                switch (datePickRangeOptions) {
                  case "normal":
                    break;
                  case "before":
                    console.log("3434343434343");
                    disabledCurrentYear = cellDate.years.toString();
                    disabledCurrentMonth = (cellDate.months + 1).toString().length === 1 ? "0" + (cellDate.months + 1).toString() : (cellDate.months + 1).toString();
                    disabledCurrentDate = cellDate.date.toString().length === 1 ? "0" + cellDate.date.toString() : cellDate.date.toString();
                    beforeDateDisabledChecker(disabledCurrentYear, disabledCurrentMonth, disabledCurrentDate);
                    break;
                  case "after":
                    disabledCurrentYear = cellDate.years.toString();
                    disabledCurrentMonth = (cellDate.months + 1).toString().length === 1 ? "0" + (cellDate.months + 1).toString() : (cellDate.months + 1).toString();
                    disabledCurrentDate = cellDate.date.toString().length === 1 ? "0" + cellDate.date.toString() : cellDate.date.toString();
                    afterDateDisabledChecker(disabledCurrentYear, disabledCurrentMonth, disabledCurrentDate);
                    break;
                }
                /* 과거 날짜 선택 금지 End */
                return (
                  <td key={`${cellDate.years}${cellDate.months}${cellDate.date}`}>
                    <button
                      onClick={handleCellClick}
                      data-target-year={cellDate.years}
                      data-target-month={cellDate.months}
                      data-target-day={cellDate.date}
                      disabled={isDateBeforeCheck}
                      className={
                        "transition group cursor-pointer rounded-full flex justify-center text-trout items-center w-9 h-9 hover:bg-primary " +
                        (dayjs(`${selectedDate.years}-${selectedDate.months + 1}-${selectedDate.date}`).isSame(dayjs(`${cellDate.years}-${cellDate.months + 1}-${cellDate.date}`)) ? "bg-primary" : "")
                      }
                    >
                      <p
                        className={
                          "dark:text-gray-100 hover:text-white text-sm " +
                          (dayjs(`${selectedDate.years}-${selectedDate.months + 1}-${selectedDate.date}`).isSame(dayjs(`${cellDate.years}-${cellDate.months + 1}-${cellDate.date}`)) ? "text-white" : selectedDate.months === cellDate.months ? "text-trout" : "text-gray-300")
                        }
                      >
                        {cellDate.date}
                      </p>
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VetfluxDatePicker;
