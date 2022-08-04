import ReservationTicket from "./ReservationTicket";
export interface DailyType {
  id: number;
  pet_name: string;
  animal: string;
  purpose: string;
  visit_date: string;
  visit_time: string;
  owner_name: string;
  owner_phone: string;
}
export default function Aside() {
  return (
    <div className="w-[25rem] h-full p-[1.625rem] bg-white text-neutral-dark rounded-2xl shadow">
      {/* 선택 */}
      <div className="text-[1.25rem] ">
        <span className="pb-4 border-b-[0.1875rem] border-neutral-dark">당일 예약 리스트</span>
      </div>

      {/* 데이트 피커 */}
      <div className="mt-12 mb-[1.625rem] w-[25rem]">datepicker</div>

      {/* 예약 티켓 공간 */}
      <div className="overflow-scroll h-[80%]">
        {/* 티켓 1개 */}
        {DAILY_DATA_TEST.map((doc: DailyType) => {
          return <ReservationTicket key={doc.id} doc={doc} />;
        })}
      </div>
    </div>
  );
}

const DAILY_DATA_TEST = [
  { id: 1, pet_name: "크림", animal: "dog", purpose: "접종 예약", visit_date: "2022.08.02", visit_time: "07:00", owner_name: "하상원", owner_phone: "01098743299" },

  { id: 2, pet_name: "우유", animal: "cat", purpose: "미용 예약", visit_date: "2022.08.02", visit_time: "09:00", owner_name: "우혜림", owner_phone: "01042311323" },

  { id: 3, pet_name: "당근", animal: "cat", purpose: "수술 예약", visit_date: "2022.08.02", visit_time: "11:00", owner_name: "이범석", owner_phone: "01014536345" },

  { id: 4, pet_name: "튀김", animal: "dog", purpose: "기타 예약", visit_date: "2022.08.02", visit_time: "14:00", owner_name: "조현우", owner_phone: "01023422343" },

  { id: 5, pet_name: "고로케", animal: "dog", purpose: "진료 예약", visit_date: "2022.08.02", visit_time: "19:00", owner_name: "박상우", owner_phone: "01067223299" },
];
