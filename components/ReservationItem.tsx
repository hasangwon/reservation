import { useEffect, useState } from "react";

const ReservationItem = ({
  id,
  petName,
  purpose,
}: {
  id: number;
  petName: string;
  purpose: string;
}) => {
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    if (purpose === "진료 예약") {
      setBackgroundColor("bg-[#ffe0aa]");
    } else if (purpose === "수술 예약") {
      setBackgroundColor("bg-[#ffd0d0]");
    } else if (purpose === "미용 예약") {
      setBackgroundColor("bg-[#eadefd]");
    } else if (purpose === "기타 예약") {
      setBackgroundColor("bg-[#e9e9f0]");
    }
  }, [purpose]);

  return (
    <div
      key={id}
      className={`${backgroundColor} h-5 rounded-[0.625rem] flex items-center justify-center m-1  `}
    >
      <span className="text-[0.625rem] text-[#4d4f5c] font-normal px-3">
        {petName}
      </span>
    </div>
  );
};

export default ReservationItem;
