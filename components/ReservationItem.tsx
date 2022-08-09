import { useEffect, useState } from "react";

const ReservationItem = ({
  id,
  petName,
  purposeType,
}: {
  id: string;
  petName: string;
  purposeType: string;
}) => {
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    if (purposeType === "consulting") {
      setBackgroundColor("bg-[#ffe0aa]");
    } else if (purposeType === "operation") {
      setBackgroundColor("bg-[#ffd0d0]");
    } else if (purposeType === "beauty") {
      setBackgroundColor("bg-[#eadefd]");
    } else if (purposeType === "vaccine") {
      setBackgroundColor("bg-[#cdf2c8]")
    } else if (purposeType === "etc") {
      setBackgroundColor("bg-[#e9e9f0]");
    }
  }, [purposeType]);

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
