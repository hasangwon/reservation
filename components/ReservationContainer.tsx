import { prototype } from "stream";
import ReservationItem from "./ReservationItem";
import { useEffect } from "react";
import { ImageError } from "next/dist/server/image-optimizer";
import {Dayjs} from "dayjs";

interface propsType {
  day: Dayjs;
  time: { id: number; time: string };
}

const ReservationContainer = ({ day, time }: propsType) => {
  let arr: {
    id: number;
    time: string;
    date: string;
    pet_name: string;
    purpose: string;
  }[] = [];

  return (
    <div className="flex justify-between w-full h-full p-2">
      <div className="flex h-[3.75rem] flex-wrap items-start">
        {RESERVATION.map(
          (res: {
            id: number;
            time: string;
            date: string;
            pet_name: string;
            purpose: string;
          }) => {
            if (
              res.date === day.format("YYYY-MM-DD") &&
              res.time === time.time
            ) {
              arr.push(res);
              if (arr.length < 4) {
                return (
                  <ReservationItem
                    purpose={res.purpose}
                    id={res.id}
                    petName={res.pet_name}
                  />
                );
              }
            }
          }
        )}
      </div>
      <div className="flex">
        {arr.length > 3 ? (
          <div className="w-6 h-4 mt-auto text-[0.625rem] text-[#808495] font-normal">
            +{arr.length - 3}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const RESERVATION: {
  id: number;
  time: string;
  date: string;
  pet_name: string;
  purpose: string;
}[] = [
  {
    id: 1,
    time: "10:00",
    date: "2022-08-01",
    pet_name: "더미",
    purpose: "진료 예약",
  },
  {
    id: 2,
    time: "11:00",
    date: "2022-08-03",
    pet_name: "벨",
    purpose: "수술 예약",
  },
  {
    id: 3,
    time: "06:00",
    date: "2022-08-06",
    pet_name: "두부",
    purpose: "미용 예약",
  },
  {
    id: 4,
    time: "13:00",
    date: "2022-08-05",
    pet_name: "뽀삐",
    purpose: "기타 예약",
  },
  {
    id: 5,
    time: "13:00",
    date: "2022-08-05",
    pet_name: "커피",
    purpose: "수술 예약",
  },
  {
    id: 6,
    time: "13:00",
    date: "2022-08-07",
    pet_name: "윌리",
    purpose: "진료 예약",
  },
  {
    id: 7,
    time: "12:00",
    date: "2022-07-31",
    pet_name: "희융이",
    purpose: "미용 예약",
  },
  {
    id: 8,
    time: "13:00",
    date: "2022-08-05",
    pet_name: "꾸뭉이",
    purpose: "진료 예약",
  },
  {
    id: 9,
    time: "06:00",
    date: "2022-07-30",
    pet_name: "해피",
    purpose: "기타 예약",
  },
  {
    id: 10,
    time: "13:00",
    date: "2022-08-05",
    pet_name: "꼬미",
    purpose: "진료 예약",
  },
  {
    id: 11,
    time: "13:00",
    date: "2022-08-05",
    pet_name: "뽀삐",
    purpose: "기타 예약",
  },
];

export default ReservationContainer;
