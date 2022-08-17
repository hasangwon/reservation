import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
interface propsTypes {
  getMonth: () => string;
  moveWeek: (name: string) => void;
  clickTodayButton: () => void;
  handleModal: (name: string, action: boolean) => void;
}
const Header = ({ getMonth, moveWeek, clickTodayButton, handleModal }: propsTypes) => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center h-12 mb-10">
        <button className="shadow-md rounded-3xl mr-3 bg-white py-3" onClick={clickTodayButton}>
          <div className="flex mx-5">
            <Image src="/images/calendar_icon.png" alt="아이콘" width={21} height={17} />
            <div className="text-[#7165DB] ml-3 font-normal">오늘</div>
          </div>
        </button>
        <div className="mx-3">
          <FontAwesomeIcon name="back" icon={faAngleLeft} className="mr-[0.7rem] text-[#4E515D]" onClick={() => moveWeek("back")} />
          <FontAwesomeIcon name="front" icon={faAngleRight} className="ml-[0.7rem] text-[#4E515D]" onClick={() => moveWeek("front")} />
        </div>
        <div className="text-3xl text-[#4E515D] mx-3">{getMonth()}</div>
      </div>
      <button className="w-[8.75rem] h-12 bg-[#6c5ce7] text-white rounded-md shadow" onClick={() => handleModal("new", true)}>
        + 새 예약 만들기
      </button>
    </div>
  );
};

export default Header;
