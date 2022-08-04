import { useEffect, useState } from "react";
import Image from "next/image";
import Dog from "../public/images/dog.png";
import Cat from "../public/images/cat.png";
import Delete from "../public/images/delete.png";
import { DailyDataType } from "../pages";

export default function ReservationTicket({ doc }: { doc: DailyDataType }) {
  const [purposeColor, setPurposeColor] = useState("");
  useEffect(() => {
    if (doc.purpose === "미용 예약") setPurposeColor("bg-[#eadefd]");
    else if (doc.purpose === "접종 예약") setPurposeColor("bg-[#cdf2c8]");
    else if (doc.purpose === "수술 예약") setPurposeColor("bg-[#ffd0d0]");
    else if (doc.purpose === "진료 예약") setPurposeColor("bg-[#ffe0aa]");
    else if (doc.purpose === "기타 예약") setPurposeColor("bg-secondary-dark");
  }, [doc.purpose]);

  return (
    <div className="relative group border-t py-4">
      {/* 예약 강아지/고양이 정보 */}
      <div className="flex items-center">
        <span className={`${purposeColor} mr-4 rounded-md px-[0.5rem] py-[0.3125rem] text-[0.8125rem]`}>{doc.purpose}</span>
        <div className="inline-block w-6 mt-[0.6rem] mr-[0.7rem]">{doc.animal === "dog" ? <Image src={Dog} alt="dog" /> : <Image src={Cat} alt="cat" />}</div>
        <span className="text-[1rem] font-normal">{doc.pet_name}</span>
      </div>
      {/* 보호자 정보 */}
      <div className="mt-2 text-[0.8125rem]">
        <span className="mr-1">{doc.owner_phone}</span>|<span className="ml-1 text-neutral-normal">{doc.owner_name} 보호자</span>
      </div>
      {/* 시간정보 */}
      <div className="flex mt-6 text-[0.8125rem]">
        <div className="flex flex-col mr-6">
          <span className=" text-neutral-light">Time</span>
          <span>{doc.visit_time}</span>
        </div>
        <div className="flex flex-col">
          <span className=" text-neutral-light">Date</span>
          <span>{doc.visit_date}</span>
        </div>
      </div>
      {/* 예약 변경 버튼 */}
      <div className="absolute right-1 bottom-[1rem] py-[0.625rem] px-[0.8125rem] text-[0.75rem] text-primary border border-primary rounded-[1.25rem]">예약 변경</div>
      {/* 예약 삭제 버튼 */}
      <div className="absolute top-6 right-7 hidden group-hover:block w-4 h-auto">
        <Image src={Delete} alt="delete" />
      </div>
    </div>
  );
}
