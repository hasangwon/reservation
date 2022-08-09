import { useState, useEffect } from "react";
import Aside from "../components/Aside";
import dayjs from "dayjs";
import CalendarContainer from "../components/CalendarContainer";
import { CalendarEventType } from "../components/Calendar";

export interface DailyDataType {
  id: number;
  type: string;
  pet_name: string;
  animal: number;
  visit_date: string;
  visit_time: string;
  owner_name: string;
  owner_phone: string;
}

export interface TestType {
  createdDate: number;
  eventDate: number;
  familyInfo: { name: string; phoneNumber: string };
  hospitalInfo: { name: string; address: string };
  petInfo: { name: string; type: number };
  key: number;
  cycleKey: number;
  purposeType: string;
  status: string;
  chiefComplaint: string;
  requester: string;
  // 보호자 || 병원
  message: string;
  vetFluxUserInfo: string;
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [dailyData, setDailyData] = useState<DailyDataType[]>([]);
  const [calendarEvent, setCalendarEvent] = useState<CalendarEventType>({});

  // 여기서 기준일에 따라 Firebase DailyData를 뽑아와야 함
  useEffect(() => {
    setDailyData([]);
    REAL_DATA.forEach((doc) => {
      if (dayjs(doc.eventDate).format("YYYY-MM-DD") === selectedDate) {
        setDailyData((ticket) => [
          ...ticket,
          { id: doc.key, type: doc.purposeType, pet_name: doc.petInfo.name, animal: doc.petInfo.type, visit_date: dayjs(doc.eventDate).format("YYYY-MM-DD"), visit_time: dayjs(doc.eventDate).format("HH:00"), owner_name: doc.familyInfo.name, owner_phone: doc.familyInfo.phoneNumber },
        ]);
      }
    });
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

//8/5,8/5,8/9,8/6,8/8,8/9
const REAL_DATA: TestType[] = [
  {
    createdDate: 1659681393471,
    eventDate: 1659681493472,
    familyInfo: { name: "하상원", phoneNumber: "01098743299" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { name: "크림", type: 0 },
    key: 1,
    cycleKey: 1,
    purposeType: "consulting",
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
    familyInfo: { name: "하상원2", phoneNumber: "01098743299" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { name: "크림2", type: 0 },
    key: 2,
    cycleKey: 2,
    purposeType: "consulting",
    status: "confirm",
    chiefComplaint: "밥을 잘 드세요",
    requester: "하상원2",
    message: "개가 다리를 절어요",
    vetFluxUserInfo: "",
  },
  {
    createdDate: 1659681393671,
    eventDate: 1659982453472,
    familyInfo: { name: "우혜림", phoneNumber: "01030953414" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { name: "우유", type: 1 },
    key: 3,
    cycleKey: 3,
    purposeType: "vaccine",
    status: "confirm",
    chiefComplaint: "약을 드세요",
    requester: "우혜림",
    message: "고양이가 밥을 못먹어요",
    vetFluxUserInfo: "",
  },
  {
    createdDate: 1659681393471,
    eventDate: 1659791499999,
    familyInfo: { name: "이범석", phoneNumber: "01055495824" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { name: "우식", type: 1 },
    key: 4,
    cycleKey: 4,
    purposeType: "beauty",
    status: "confirm",
    chiefComplaint: "잘 말려주세요",
    requester: "이범석",
    message: "스포츠 헤어로 잘라주세요",
    vetFluxUserInfo: "",
  },
  {
    createdDate: 1659945762631,
    eventDate: 1659945762631,
    familyInfo: { name: "조현우", phoneNumber: "01012345678" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { name: "유주", type: 1 },
    key: 5,
    cycleKey: 5,
    purposeType: "beauty",
    status: "confirm",
    chiefComplaint: "염색은 안됩니다",
    requester: "이범석",
    message: "염색해주세요",
    vetFluxUserInfo: "",
  },
  {
    createdDate: 1659945762631,
    eventDate: 1660045762631,
    familyInfo: { name: "김보미", phoneNumber: "01098776541" },
    hospitalInfo: { name: "vetflux", address: "역삼역" },
    petInfo: { name: "류광", type: 0 },
    key: 6,
    cycleKey: 6,
    purposeType: "vaccine",
    status: "confirm",
    chiefComplaint: "아프겠네요",
    requester: "김보미",
    message: "감기에 걸렸어요",
    vetFluxUserInfo: "",
  },
];
