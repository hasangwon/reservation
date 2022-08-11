import { useState, useEffect } from "react";
import { firestore } from "../components/Firestore";
import Aside from "../components/Aside";
import dayjs from "dayjs";
import CalendarContainer from "../components/CalendarContainer";
import { CalendarEventType } from "../components/Calendar";

export interface DailyDataType {
  id: string;
  type: string;
  pet_name: string;
  animal: number;
  visit_date: string;
  visit_time: string;
  owner_name: string;
  owner_phone: string;
}

interface TestType {
  createdDate: number;
  eventDate: number;
  familyInfo: { name: string; phoneNumber: string };
  hospitalInfo: { name: string; address: string };
  petInfo: { name: string; type: number };
  key: string;
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
  const [weeklyData, setWeeklyData] = useState<TestType[]>([]);
  const [calendarEvent, setCalendarEvent] = useState<CalendarEventType>({});
  const [startDate, setStartDate] = useState(dayjs().startOf("week").valueOf());
  const [endDate, setEndDate] = useState(dayjs().endOf("week").valueOf());

  //Weekly Data Set, calendar에서 변경시 아직 미적용
  // useEffect(() => {
  //   const weekly = firestore.collection("hospital").doc("8owQXXXfuCJnix7uSkqr").collection("Reservation").where("eventDate", ">=", dayjs(selectedDate).startOf("week").valueOf()).where("eventDate", "<=", dayjs(selectedDate).endOf("week").valueOf());

  //   const unsubscribe = weekly.onSnapshot((docs) => {
  //     setWeeklyData([]);
  //     if (!docs.empty) {
  //       docs.forEach((doc) => {
  //         setWeeklyData((value) => [...value, doc.data() as TestType]);
  //       });
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [selectedDate]);

  //  // Daily Data Set
  //  useEffect(() => {
  //   setDailyData([]);
  //   weeklyData.forEach((doc) => {
  //     if (selectedDate == dayjs(doc.eventDate).format("YYYY-MM-DD")) {
  //       setDailyData((ticket) => [
  //         ...ticket,
  //         {
  //           id: doc.key,
  //           type: doc.purposeType,
  //           pet_name: doc.petInfo.name,
  //           animal: doc.petInfo.type,
  //           visit_date: dayjs(doc.eventDate).format("YYYY-MM-DD"),
  //           visit_time: dayjs(doc.eventDate).format("HH:00"),
  //           owner_name: doc.familyInfo.name,
  //           owner_phone: doc.familyInfo.phoneNumber,
  //         },
  //       ]);

  //     }
  //   });
  // }, [weeklyData, selectedDate]);

  // 기준일 변경
  useEffect(() => {
    if (startDate <= dayjs(selectedDate).valueOf() && dayjs(selectedDate).valueOf() <= endDate) {
      setDailyData([]);
      weeklyData.forEach((doc) => {
        if (selectedDate == dayjs(doc.eventDate).format("YYYY-MM-DD")) {
          setDailyData((ticket) => [
            ...ticket,
            {
              id: doc.key,
              type: doc.purposeType,
              pet_name: doc.petInfo.name,
              animal: doc.petInfo.type,
              visit_date: dayjs(doc.eventDate).format("YYYY-MM-DD"),
              visit_time: dayjs(doc.eventDate).format("HH:00"),
              owner_name: doc.familyInfo.name,
              owner_phone: doc.familyInfo.phoneNumber,
            },
          ]);
        }
      });
    } else {
      setStartDate(dayjs(selectedDate).startOf("week").valueOf());
      setEndDate(dayjs(selectedDate).endOf("week").valueOf());
    }
  }, [selectedDate]);

  //시작일 바꼈을떄
  useEffect(() => {
    const weekly = firestore.collection("hospital").doc("8owQXXXfuCJnix7uSkqr").collection("Reservation").where("eventDate", ">=", dayjs(selectedDate).startOf("week").valueOf()).where("eventDate", "<=", dayjs(selectedDate).endOf("week").valueOf());

    const unsubscribe = weekly.onSnapshot((docs) => {
      setWeeklyData([]);
      docs.forEach((doc) => {
        setWeeklyData((value) => [...value, doc.data() as TestType]);
      });
    });

    return () => {
      unsubscribe();
    };
  }, [startDate]);

  // 주 데이터 변경
  useEffect(() => {
    if (weeklyData === undefined) return;

    if (startDate <= dayjs(selectedDate).valueOf() && dayjs(selectedDate).valueOf() <= endDate) {
      setDailyData([]);
      weeklyData.forEach((doc) => {
        if (selectedDate == dayjs(doc.eventDate).format("YYYY-MM-DD")) {
          setDailyData((ticket) => [
            ...ticket,
            {
              id: doc.key,
              type: doc.purposeType,
              pet_name: doc.petInfo.name,
              animal: doc.petInfo.type,
              visit_date: dayjs(doc.eventDate).format("YYYY-MM-DD"),
              visit_time: dayjs(doc.eventDate).format("HH:00"),
              owner_name: doc.familyInfo.name,
              owner_phone: doc.familyInfo.phoneNumber,
            },
          ]);
        }
      });
    }
  }, [weeklyData]);

  // Weekly Data 변경 시, 일/시간 별로 저장
  useEffect(() => {
    const filteredData = weeklyData.reduce(function (acc: CalendarEventType = {}, cur) {
      let date = dayjs(cur.eventDate).format("YYYY-MM-DD");
      let time = dayjs(cur.eventDate).format("HH:00");

      let timeArray = [];
      if (acc[date] !== undefined && acc[date][time] !== undefined) timeArray = acc[date][time];

      acc[date] = { ...acc[date], [time]: [...timeArray, cur] };

      return acc;
    }, {});
    setCalendarEvent(filteredData);
  }, [weeklyData]);

  // 목 데이터 사용시
  // useEffect(() => {
  //   setDailyData([]);
  //   REAL_DATA.forEach((doc) => {
  //     if (dayjs(doc.eventDate).format("YYYY-MM-DD") === selectedDate) {
  //       setDailyData((ticket) => [
  //         ...ticket,
  //         { id: doc.key, type: doc.purposeType, pet_name: doc.petInfo.name, animal: doc.petInfo.type, visit_date: dayjs(doc.eventDate).format("YYYY-MM-DD"), visit_time: dayjs(doc.eventDate).format("HH:00"), owner_name: doc.familyInfo.name, owner_phone: doc.familyInfo.phoneNumber },
  //       ]);
  //     }
  //   });
  // }, [selectedDate]);

  console.log("render");
  return (
    <div className="flex bg-secondary-normal w-screen h-screen p-[3.5rem]">
      <div className={"w-[25rem]"}>
        <Aside dailyData={dailyData} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className="ml-20 flex-1 h-full">
        <CalendarContainer events={calendarEvent} />
      </div>
    </div>
  );
}

// const REAL_DATA: TestType[] = [
//   {
//     createdDate: 1659681393471,
//     eventDate: 1659681493472,
//     familyInfo: { name: "하상원", phoneNumber: "01098743299" },
//     hospitalInfo: { name: "vetflux", address: "역삼역" },
//     petInfo: { name: "크림", type: 0 },
//     key: 1,
//     cycleKey: 1,
//     purposeType: "consulting",
//     status: "confirm",
//     chiefComplaint: "밥을 잘 드세요",
//     requester: "하상원",
//     // 보호자 || 병원
//     message: "개가 다리를 절어요",
//     vetFluxUserInfo: "",
//     // 7일 구한 그 스케줄 기준으로 가져와서 [] {날짜 : 시간 : [] 으로 저장 }
//   },
//   {
//     createdDate: 1659681393471,
//     eventDate: 1659681493472,
//     familyInfo: { name: "하상원2", phoneNumber: "01098743299" },
//     hospitalInfo: { name: "vetflux", address: "역삼역" },
//     petInfo: { name: "크림2", type: 0 },
//     key: 2,
//     cycleKey: 2,
//     purposeType: "consulting",
//     status: "confirm",
//     chiefComplaint: "밥을 잘 드세요",
//     requester: "하상원2",
//     message: "개가 다리를 절어요",
//     vetFluxUserInfo: "",
//   },
//   {
//     createdDate: 1659681393671,
//     eventDate: 1659982453472,
//     familyInfo: { name: "우혜림", phoneNumber: "01030953414" },
//     hospitalInfo: { name: "vetflux", address: "역삼역" },
//     petInfo: { name: "우유", type: 1 },
//     key: 3,
//     cycleKey: 3,
//     purposeType: "vaccine",
//     status: "confirm",
//     chiefComplaint: "약을 드세요",
//     requester: "우혜림",
//     message: "고양이가 밥을 못먹어요",
//     vetFluxUserInfo: "",
//   },
//   {
//     createdDate: 1659681393471,
//     eventDate: 1659791499999,
//     familyInfo: { name: "이범석", phoneNumber: "01055495824" },
//     hospitalInfo: { name: "vetflux", address: "역삼역" },
//     petInfo: { name: "우식", type: 1 },
//     key: 4,
//     cycleKey: 4,
//     purposeType: "beauty",
//     status: "confirm",
//     chiefComplaint: "잘 말려주세요",
//     requester: "이범석",
//     message: "스포츠 헤어로 잘라주세요",
//     vetFluxUserInfo: "",
//   },
//   {
//     createdDate: 1659945762631,
//     eventDate: 1659945762631,
//     familyInfo: { name: "조현우", phoneNumber: "01012345678" },
//     hospitalInfo: { name: "vetflux", address: "역삼역" },
//     petInfo: { name: "유주", type: 1 },
//     key: 5,
//     cycleKey: 5,
//     purposeType: "beauty",
//     status: "confirm",
//     chiefComplaint: "염색은 안됩니다",
//     requester: "이범석",
//     message: "염색해주세요",
//     vetFluxUserInfo: "",
//   },
//   {
//     createdDate: 1659945762631,
//     eventDate: 1660045762631,
//     familyInfo: { name: "김보미", phoneNumber: "01098776541" },
//     hospitalInfo: { name: "vetflux", address: "역삼역" },
//     petInfo: { name: "류광", type: 0 },
//     key: 6,
//     cycleKey: 6,
//     purposeType: "vaccine",
//     status: "confirm",
//     chiefComplaint: "아프겠네요",
//     requester: "김보미",
//     message: "감기에 걸렸어요",
//     vetFluxUserInfo: "",
//   },
// ];
