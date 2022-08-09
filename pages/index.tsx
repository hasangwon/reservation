import { useState, useEffect } from "react";
import Aside from "../components/Aside";
import dayjs from "dayjs";
import CalendarContainer from "../components/CalendarContainer";
import { CalendarEventType } from "../components/Calendar";

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
  eventDate: number;
  familyInfo: { name: string; phone: string };
  hospitalInfo: { name: string; address: string };
  petInfo: { pet_name: string; animal: string };
  key: number;
  cycleKey: number;
  category: string;
  type: string;
  status: string;
  chiefComplaint: string;
  requester: string;
  // 보호자 || 병원
  message: string;
  vetFluxUserInfo: string;
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [dailyData, setDailyData] = useState<DailyDataType[]>([]);
  const [calendarEvent, setCalendarEvent] = useState<CalendarEventType>({});

  // 여기서 기준일에 따라 Firebase DailyData를 뽑아와야 함
  useEffect(() => {
    setDailyData([]);
    DAILY_DATA.forEach((doc) => setDailyData((ticket) => [...ticket, doc]));
  }, [selectedDate]);

  useEffect(() => {
    // setTest({});
    const filteredData = REAL_DATA.reduce(function (acc: CalendarEventType = {}, cur) {
      let date = dayjs(cur.eventDate).format("YYYY-MM-DD");
      let time = dayjs(cur.eventDate).format("HH:00");

      let timeArray = [];
      if (acc[date] !== undefined && acc[date][time] !== undefined) timeArray = acc[date][time];

      acc[date] = { ...acc[date], [time]: [...timeArray, cur] };

      return acc;
    }, {});
    setCalendarEvent(filteredData);
  }, []);

  return (
    <div className="flex bg-secondary-normal w-screen h-screen p-[3.5rem]">
      <div className={"w-[25rem]"}>
        <Aside dailyData={dailyData} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className="ml-20 flex-1 h-full">
        <CalendarContainer events={calendarEvent}/>
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

//8/5,8/5,8/9,8/6,8/8,8/9
const REAL_DATA: TestType[] = [
  {
    createdDate: 1659681393471,
    eventDate: 1659681493472,
    familyInfo: { name: "하상원", phone: "01098743299" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { pet_name: "크림", animal: "dog" },
    key: 1,
    cycleKey: 1,
    category: "reservation",
    type: "consulting",
    status: "confirm",
    chiefComplaint: "밥을 잘 드세요",
    requester: "하상원",
    // 보호자 || 병원
    message: "개가 다리를 절어요",
    vetFluxUserInfo: "",
    // 7일 구한 그 스케줄 기준으로 가져와서 [] {날짜 : 시간 : [] 으로 저장 }
  },
  {
    createdDate: 1659681393471,
    eventDate: 1659681493472,
    familyInfo: { name: "하상원2", phone: "01098743299" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { pet_name: "크림2", animal: "dog" },
    key: 1,
    cycleKey: 1,
    category: "reservation",
    type: "consulting",
    status: "confirm",
    chiefComplaint: "밥을 잘 드세요",
    requester: "하상원2",
    // 보호자 || 병원
    message: "개가 다리를 절어요",
    vetFluxUserInfo: "",
    // 7일 구한 그 스케줄 기준으로 가져와서 [] {날짜 : 시간 : [] 으로 저장 }
  },
  {
    createdDate: 1659681393671,
    eventDate: 1659982453472,
    familyInfo: { name: "우혜림", phone: "01030953414" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { pet_name: "우유", animal: "cat" },
    key: 2,
    cycleKey: 2,
    category: "reservation",
    type: "vaccine",
    status: "confirm",
    chiefComplaint: "약을 드세요",
    requester: "우혜림",
    message: "고양이가 밥을 못먹어요",
    vetFluxUserInfo: "",
  },
  {
    createdDate: 1659681393471,
    eventDate: 1659791499999,
    familyInfo: { name: "이범석", phone: "01055495824" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { pet_name: "우식", animal: "cat" },
    key: 3,
    cycleKey: 3,
    category: "reservation",
    type: "beauty",
    status: "confirm",
    chiefComplaint: "잘 말려주세요",
    requester: "이범석",
    message: "스포츠 헤어로 잘라주세요",
    vetFluxUserInfo: "",
  },
  {
    createdDate: 1659945762631,
    eventDate: 1659945762631,
    familyInfo: { name: "조현우", phone: "01012345678" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { pet_name: "유주", animal: "cat" },
    key: 4,
    cycleKey: 4,
    category: "reservation",
    type: "beauty",
    status: "confirm",
    chiefComplaint: "염색은 안됩니다",
    requester: "이범석",
    message: "염색해주세요",
    vetFluxUserInfo: "",
  },
  {
    createdDate: 1659945762631,
    eventDate: 1660045762631,
    familyInfo: { name: "김보미", phone: "01098776541" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { pet_name: "류광", animal: "dog" },
    key: 5,
    cycleKey: 5,
    category: "reservation",
    type: "vaccine",
    status: "confirm",
    chiefComplaint: "아프겠네요",
    requester: "김보미",
    message: "감기에 걸렸어요",
    vetFluxUserInfo: "",
  },
];
