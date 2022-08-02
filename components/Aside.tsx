/* eslint-disable react/no-unknown-property */
import Dog from "../public/images/dog.png";
import Image from "next/image";
export default function Aside() {
  return (
    <div className="w-[402px] h-[962px] m-[60px] p-3 rounded-2xl shadow bg-white text-[#333] font-light ">
      {/* 선택 */}
      <h1 className="mt-1 text-[20px]">당일 예약 리스트</h1>

      {/* 데이트 피커 */}
      <div className="mt-2">datepicker</div>

      {/* 예약 티켓 공간 */}
      <div className="mt-2 p-2">
        {/* 티켓 1개 */}
        <div className="relative group border-t">
          {/* 예약 정보 */}
          <div className="flex items-center mt-3">
            <span className="mr-2 bg-purple-300 rounded-md px-2 leading-5 font-normal">미용예약</span>
            <div className="inline-block w-4">
              <Image src={Dog} alt="dog" className="w-full h-auto" />
            </div>
            <span className="ml-2 text-[14px] font-normal">모랑</span>
          </div>
          {/* 보호자 정보 */}
          <div className="mt-2">
            <span className="mr-1">01098743299</span>|<span className="text-slate-500 ml-1">하상원 보호자</span>
          </div>
          {/* 시간정보 */}
          <div className="flex mt-3 mb-3">
            <div className="flex flex-col mr-6">
              <span className="-mb-1 text-slate-400">Time</span>
              <span>12:01</span>
            </div>
            <div className="flex flex-col">
              <span className="-mb-1 text-slate-400">Date</span>
              <span>2022.06.01</span>
            </div>
          </div>
          {/* 예약 변경 버튼 */}
          <div className="absolute bottom-0 right-0 text-primary border border-primary rounded-2xl p-1 px-2 font-normal">예약 변경</div>
          {/* 예약 삭제 버튼 */}
          <div className="absolute top-5 right-4 hidden group-hover:block">삭제</div>
        </div>
      </div>
    </div>
  );
}
