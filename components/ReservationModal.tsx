import dayjs from "dayjs";
import React, { MouseEventHandler, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { VetfluxButton } from "./VetfluxButton";
import VetfluxDatePicker from "./VetfluxDatePicker";
import VetfluxLabelAndInput from "./VetfluxLabelAndInput";
import VetfluxDropdownsTime from "./VetfluxDropdownsTime";
import VetfluxLabelAndSelectOption from "./VetfluxLabelAndSelectOption";
import VetFluxTemplateEditBlock from "./VetfluxTemplateEditBlock";

import Image from "next/image";
import Dog from "../public/images/dog.png";
import Cat from "../public/images/cat.png";
import { DailyDataType } from "../pages";

interface ReservationModalProps {
  messageTemplate: string;
  onNextClick: (value: { eventDate: number; message: string; purposeType: string }) => void;
  onCancelClick: MouseEventHandler<HTMLButtonElement>;
  doc: DailyDataType;
  typeSetting: { color: string; type: string };
}

const ReservationModal = ({ messageTemplate, onNextClick, onCancelClick, doc, typeSetting }: ReservationModalProps) => {
  const [reserveSendMessage, setReserveSendMessage] = useState(messageTemplate);
  const [currentHour, setCurrentHour] = useState(dayjs().format("HH:00"));
  const [currentDate, setCurrentDate] = useState(dayjs().valueOf());
  const [isShownDatePicker, setShownDatePicker] = useState(false);
  const [isShownHourPicker, setShownHourPicker] = useState(false);
  const [isShownPurposeTypePicker, setPurposeTypePicker] = useState(false);
  const [purposeType, setPurposeType] = useState("진료");
  const [operatingTimeArray, setOperatingTimeArray] = useState<string[]>([]);
  const onMessageInputChange = (value: any) => {
    setReserveSendMessage(value);
  };
  const toggleHourSelectOption = () => {
    setShownHourPicker(!isShownHourPicker);
  };
  const selectHourSelectOption = (event: any) => {
    setShownHourPicker(false);
    setCurrentHour(event.target.value);
  };
  const toggleDatePickerPopup = () => {
    setShownDatePicker(!isShownDatePicker);
  };
  const togglePurposeTypePicker = () => {
    setPurposeTypePicker(!isShownPurposeTypePicker);
  };
  const selectPurposeTypePickerOption = (event: any) => {
    setPurposeType(event.target.value);
    setPurposeTypePicker(false);
  };

  //데이트피커 날짜 바꾸는 함수인데 왜 작동 안해 ?
  const selectDatePickerValue = (date: number) => {
    setShownDatePicker(false);
    setCurrentDate(date);
  };

  const calcOpenCloseTime = () => {
    let getOpenTime = 0;
    const getCloseTime = 23;
    const currentHour = 0; //
    if (dayjs().isSame(dayjs(), "date")) {
      getOpenTime = currentHour;
    }
    setCurrentHour(`${currentHour <= 9 ? `0` + currentHour : currentHour}:00`);
    const operatingTime = [];
    for (let i: number = getOpenTime; i <= getCloseTime; i++) {
      const pushData = () => {
        if (i >= 12) return `${i}:00`;
        if (i <= 9) return `0${i}:00`;
        return `${i}:00`;
      };
      operatingTime.push(pushData());
    }
    setOperatingTimeArray(operatingTime);
  };

  const handleNextClick = (event: any) => {
    event.preventDefault();
    const dateFormatChange = `${dayjs(currentDate).format("YYYY.MM.DD")}`;
    const sumDate = `${dateFormatChange} ${currentHour}`;
    const resultDate = dayjs(sumDate).valueOf();
    onNextClick({
      eventDate: dayjs(resultDate).valueOf(),
      message: reserveSendMessage,
      purposeType: purposeType,
    });
  };

  useEffect(() => {
    calcOpenCloseTime();
  }, []);

  const [defaultTime, setDefaultTime] = useState(dayjs().valueOf());
  const className = "bottom-[180px]";

  const handleDateData = (millisecond: number) => {
    setCurrentDate(dayjs(millisecond).valueOf());
    setDefaultTime(millisecond);
    setShownDatePicker(false);
  };

  const handleDatePickerCancel = () => {
    setShownDatePicker(false);
  };

  return (
    <div className="fixed z-50 w-full h-full left-0 top-0 bg-[#00000045]">
      <div className="relative z-50 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] bg-white w-[42.6875rem] rounded-3xl py-[1.875rem] px-[1.625rem] shadow-xl">
        <header className="text-[#4d4f5c] text-[1.25rem] mb-[.8625rem] font-bold">예약 변경</header>
        <p className="text-[.875rem] text-[#b0aebc]">아래 보호자 번호로 전화 상담을 통해 예약 날짜를 상의 후 예약을 변경해 주세요!</p>
        <div className="mt-[2rem] mb-3 text-[#4d4f5c] text-[0.85rem] font-bold">예약 내역</div>

        {/* Doc 구간 */}
        <div className="bg-neutral-dark text-secondary-light rounded-lg px-6 pt-4 pb-2">
          <div className="border-b-[0.05rem] border-neutral-light pb-3">꼭 보호자에게 전화 후 예약 변경을 진행해 주세요!</div>
          <div className="mt-3">
            <span className="mr-4">
              {doc.owner_phone.slice(0, 3)} {doc.owner_phone.slice(3, 7)} {doc.owner_phone.slice(7, 11)}
            </span>
            <span>{doc.owner_name} 보호자</span>
          </div>
          <div className="flex items-center">
            <span className={`${typeSetting.color} text-neutral-dark mr-4 rounded-md px-[0.5rem] py-[0.1rem] text-[0.8125rem]`}>{typeSetting.type}</span>
            {dayjs(dayjs(doc.visit_date).valueOf()).format("YYYY.MM.DD")} / {doc.visit_time} 예약
            <div className="inline-block w-6 mt-[0.6rem] mr-[0.7rem] ml-10">{doc.animal === 0 ? <Image src={Dog} alt="dog" /> : <Image src={Cat} alt="cat" />}</div>
            {doc.pet_name}
          </div>
        </div>

        <VetFluxTemplateEditBlock message={reserveSendMessage} onChangeEvent={onMessageInputChange} description={"메세지 안내는 카카오톡으로 발송되며 해당 내용은 웹 메신저에서 보여집니다."} actions={["병원 이름", "예약 날짜", "펫 이름"]} label={"예약 메시지 내용"} />
        <p className="text-[#4d4f5c] mt-[3.5rem] mb-[.625rem] font-bold">예약 날짜 / 시간 / 유형</p>
        <div className="flex">
          {/* {isShownDatePicker && <VetfluxDatePicker handleDateData={selectDatePickerValue} handleDatePickerCancel={toggleDatePickerPopup} datePickRangeOptions={"after"} className={"bottom-[180px]"} />} */}
          {isShownDatePicker && <VetfluxDatePicker datePickRangeOptions="normal" handleDatePickerCancel={handleDatePickerCancel} handleDateData={handleDateData} className={className} defaultTime={defaultTime} />}
          <div className="flex mt-1">
            <button onClick={toggleDatePickerPopup} className={"text-trout w-[200px] group-hover:bg-zircon border-whisper border shadow-sm py-2 px-5  transition rounded-md mr-[15px] focus:outline-none focus:ring-primary focus:ring-offset-gray-100 focus:ring-offset-2 focus:ring-2"}>
              {dayjs(currentDate).format("YYYY.MM.DD")}
            </button>
            <VetfluxDropdownsTime defaultValue={`전체`} currentValue={currentHour} list={operatingTimeArray} isShownList={isShownHourPicker} handleListToggle={toggleHourSelectOption} handleListItemClick={selectHourSelectOption} />
            <VetfluxDropdownsTime defaultValue={"진료"} currentValue={purposeType} list={["진료", "수술", "접종", "미용", "기타"]} isShownList={isShownPurposeTypePicker} handleListToggle={togglePurposeTypePicker} handleListItemClick={selectPurposeTypePickerOption} className={"ml-4"} />
          </div>
        </div>
        <div className="flex justify-end mt-[3.25rem] w-full">
          <VetfluxButton className="mr-[1.5rem]" type={1} text={`취소`} onClick={onCancelClick} />
          <VetfluxButton className="text-[1rem]" type={0} text={`예약`} onClick={handleNextClick} />
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
