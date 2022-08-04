import { useState, useEffect } from "react";
import Aside from "../components/Aside";

export interface DailyDataType {
  id: number;
  pet_name: string;
  animal: string;
  purpose: string;
  visit_date: string;
  visit_time: string;
  owner_name: string;
  owner_phone: string;
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [dailyData, setDailyData] = useState<DailyDataType[]>([]);

  // 여기서 기준일에 따라 Firebase DailyData를 뽑아와야 함
  useEffect(() => {
    setDailyData([]);
    DAILY_DATA.forEach((doc) => setDailyData((ticket) => [...ticket, doc]));
  }, [selectedDate]);

  return (
    <div className="flex bg-secondary-normal w-screen h-screen p-[3.5rem]">
      <Aside dailyData={dailyData} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
}

const DAILY_DATA: DailyDataType[] = [
  { id: 1, pet_name: "크림", animal: "dog", purpose: "접종 예약", visit_date: "2022.08.02", visit_time: "07:00", owner_name: "하상원", owner_phone: "01098743299" },

  { id: 2, pet_name: "우유", animal: "cat", purpose: "미용 예약", visit_date: "2022.08.02", visit_time: "09:00", owner_name: "우혜림", owner_phone: "01042311323" },

  { id: 3, pet_name: "당근", animal: "cat", purpose: "수술 예약", visit_date: "2022.08.02", visit_time: "11:00", owner_name: "이범석", owner_phone: "01014536345" },

  { id: 4, pet_name: "튀김", animal: "dog", purpose: "기타 예약", visit_date: "2022.08.02", visit_time: "14:00", owner_name: "조현우", owner_phone: "01023422343" },

  { id: 5, pet_name: "고로케", animal: "dog", purpose: "진료 예약", visit_date: "2022.08.02", visit_time: "19:00", owner_name: "박상우", owner_phone: "01067223299" },
];
