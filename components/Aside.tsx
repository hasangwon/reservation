import { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import ReservationTicket from "./ReservationTicket";
import VetfluxDatePicker from "./VetfluxDatePicker";
import Image from "next/image";
import Down from "../public/images/down.png";
import { DailyDataType } from "../pages";

export interface AsidePropsType {
  dailyData: DailyDataType[];
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

export default function Aside({ dailyData, selectedDate, setSelectedDate }: AsidePropsType) {
  const [isOpenPicker, setIsOpenPicker] = useState<boolean>(false);
  const [defaultTime, setDefaultTime] = useState(dayjs().valueOf());
  const className = "";

  const handleDateData = (millisecond: number) => {
    setSelectedDate(dayjs(millisecond).format("YYYY-MM-DD"));
    setDefaultTime(millisecond);
    setIsOpenPicker(false);
  };

  const handleDatePickerCancel = () => {
    setIsOpenPicker(false);
  };

  const handlePicker = () => {
    setIsOpenPicker(!isOpenPicker);
  };

  return (
    <div className="flex flex-col w-full h-full pb-4 bg-white text-neutral-dark rounded-2xl shadow">
      {/* 메뉴얼 */}
      <div className="text-[1.25rem] pt-[1.625rem] px-[1.625rem]">
        <span className="pb-4 border-b-[0.1875rem] border-neutral-dark select-none font-bold">예약 리스트</span>
      </div>

      {/* 데이트 피커 */}
      <div className="mt-12 mb-[1.625rem] min-w-[25rem] px-[1.625rem] select-none">
        <div className="flex justify-between items-center	w-[8.75rem] h-[2rem] mb-[0.125rem] px-[0.75rem] text-[0.8125rem] text-neutral-dark border border-secondary-dark rounded-md shadow cursor-pointer" onClick={handlePicker}>
          <span className="inline-block">{selectedDate ? selectedDate : "날짜 선택"}</span>
          <span className="inline-block w-[1.25rem] h-auto mt-[0.25rem] mr-[-0.25rem]">
            <Image src={Down} alt="down" />
          </span>
        </div>
        {isOpenPicker && <VetfluxDatePicker datePickRangeOptions="normal" handleDatePickerCancel={handleDatePickerCancel} handleDateData={handleDateData} className={className} defaultTime={dayjs(selectedDate).valueOf()} />}
      </div>

      {/* 예약 티켓 공간 */}
      <div className="h-full overflow-y-scroll">
        {/* 티켓 1개 */}
        {dailyData.map((doc: DailyDataType, idx) => {
          return <ReservationTicket key={idx} doc={doc} />;
        })}
      </div>
    </div>
  );
}
