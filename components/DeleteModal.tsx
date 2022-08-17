import dayjs from "dayjs";
import React, { MouseEventHandler, useEffect, useState } from "react";

import { VetfluxButton } from "./VetfluxButton";
import Image from "next/image";
import Dog from "../public/images/dog.png";
import Cat from "../public/images/cat.png";
import { DailyDataType } from "../pages";

interface DeleteModalProps {
  onDeleteClick: () => void;
  onCancelClick: MouseEventHandler<HTMLButtonElement>;
  doc: DailyDataType;
  typeSetting: { color: string; type: string };
}

const DeleteModal = ({ onDeleteClick, onCancelClick, doc, typeSetting }: DeleteModalProps) => {
  const handleDeleteClick = (event: any) => {
    event.preventDefault();
    onDeleteClick();
  };

  return (
    <div className="fixed z-50 w-full h-full left-0 top-0 bg-[#00000045]">
      <div className="relative z-50 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] bg-white w-[42.6875rem] rounded-3xl py-[1.875rem] px-[1.625rem] shadow-xl">
        <header className="text-[#4d4f5c] text-[1.25rem] mb-[.8625rem] font-bold">예약 삭제</header>
        <p className="text-[.875rem] text-[#b0aebc]">예약을 삭제할 경우 보호자에게 알림으로 안내가 갑니다. 꼭 필요한 상황에서 사용해주세요!</p>
        <div className="mt-[2rem] mb-3 text-[#4d4f5c] text-[0.85rem] font-bold">예약 내역</div>

        {/* Doc 구간 */}
        <div className="bg-neutral-dark text-secondary-light rounded-lg px-6 pt-4 pb-2">
          <div className="border-b-[0.05rem] border-neutral-light pb-3">예약을 삭제할 경우 보호자에게 알림으로 안내되니 참고해 주세요!</div>
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

        <div className="flex justify-end mt-[3.25rem] w-full">
          <VetfluxButton className="mr-[1.5rem]" type={1} text={`취소`} onClick={onCancelClick} />
          <VetfluxButton className="text-[1rem]" type={0} text={`삭제`} onClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
