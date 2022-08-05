import { useState, useEffect } from "react";
import Aside from "../components/Aside";

export interface DailyDataType {
  id: number;
  type: string;
  pet_name: string;
  animal: string;
  visit_date: string;
  visit_time: string;
  owner_name: string;
  owner_phone: string;
}

export interface TestType {
  createdDate: number;
  familyInfo: { name: string; phone: string };
  hospitalInfo: { name: string; address: string };
  key: number;
  lastEventInfo: {
    cycleKey: number;
    key: number;
    category: string;
    type: string;
    action: string;
    chiefComplaint: string;
    createdDate: number;
    eventDate: number;
    requester: string;
    message: string;
  };
  petInfo: { pet_name: string; animal: string };
  vetFluxUserInfo: "";
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [dailyData, setDailyData] = useState<DailyDataType[]>([]);
  const [test, setTest] = useState<TestType[]>([]);

  // 여기서 기준일에 따라 Firebase DailyData를 뽑아와야 함
  useEffect(() => {
    setDailyData([]);
    DAILY_DATA.forEach((doc) => setDailyData((ticket) => [...ticket, doc]));
  }, [selectedDate]);

  useEffect(() => {
    setTest([]);
    REAL_DATA.forEach((doc) => setTest((ticket) => [...ticket, doc]));
  }, []);

  return (
    <div className="flex bg-secondary-normal w-screen h-screen p-[3.5rem]">
      <div>
        <Aside dailyData={dailyData} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
    </div>
  );
}

const DAILY_DATA: DailyDataType[] = [
  { id: 1, type: "consulting", pet_name: "크림", animal: "dog", visit_date: "2022.08.02", visit_time: "07:00", owner_name: "하상원", owner_phone: "01098743299" },

  { id: 2, type: "vaccine", pet_name: "우유", animal: "cat", visit_date: "2022.08.02", visit_time: "09:00", owner_name: "우혜림", owner_phone: "01042311323" },

  { id: 3, type: "beauty", pet_name: "당근", animal: "cat", visit_date: "2022.08.02", visit_time: "11:00", owner_name: "이범석", owner_phone: "01014536345" },

  { id: 4, type: "operation", pet_name: "튀김", animal: "dog", visit_date: "2022.08.02", visit_time: "14:00", owner_name: "조현우", owner_phone: "01023422343" },

  { id: 5, type: "etc", pet_name: "고로케", animal: "dog", visit_date: "2022.08.02", visit_time: "19:00", owner_name: "박상우", owner_phone: "01067223299" },
];

const REAL_DATA: TestType[] = [
  {
    createdDate: 1659681393471,
    familyInfo: { name: "하상원", phone: "01098743299" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    key: 1,
    lastEventInfo: {
      cycleKey: 1,
      key: 1,
      category: "reservation",
      // type: 'consulting' | 'vaccine' | 'beauty' | 'operation' | 'etc',
      type: "consulting",
      action: "confirm",
      chiefComplaint: "밥을 잘 드세요",
      createdDate: 1659681393471,
      eventDate: 1659681493472,
      requester: "하상원",
      message: "개가 다리를 절어요",
    },
    petInfo: { pet_name: "크림", animal: "dog" },
    vetFluxUserInfo: "",
  },
  {
    createdDate: 1659681393671,
    familyInfo: { name: "우혜림", phone: "01030953414" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    key: 2,
    lastEventInfo: {
      cycleKey: 2,
      key: 1,
      category: "reservation",
      // type: 'consulting' | 'vaccine' | 'beauty' | 'operation' | 'etc',
      type: "vaccine",
      action: "confirm",
      chiefComplaint: "약을 드세요",
      createdDate: 1659681393971,
      eventDate: 1659682453472,
      requester: "우혜림",
      message: "고양이가 밥을 못먹어요",
    },
    petInfo: { pet_name: "우유", animal: "cat" },
    vetFluxUserInfo: "",
  },
  {
    createdDate: 1659681393471,
    familyInfo: { name: "이범석", phone: "01055495824" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    key: 3,
    lastEventInfo: {
      cycleKey: 3,
      key: 1,
      category: "reservation",
      // type: 'consulting' | 'vaccine' | 'beauty' | 'operation' | 'etc',
      type: "beauty",
      action: "confirm",
      chiefComplaint: "잘 말려주세요",
      createdDate: 1659681395471,
      eventDate: 1659681499999,
      requester: "이범석",
      message: "스포츠 헤어로 잘라주세요",
    },
    petInfo: { pet_name: "우식", animal: "cat" },
    vetFluxUserInfo: "",
  },
];
