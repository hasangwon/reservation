import Calendar, { CalendarEventType } from "./Calendar";
import Header from "./Header";

interface CalendarContainerPropsType {
  events: CalendarEventType;
  selectedDate: string;
  setSelectedDate: any;
  days: any;
  clickTodayButton: any;
  getMonth: () => string;
  moveWeek: (name: string) => void;
  handleModal: (name: string, action: boolean) => void;
}
const CalendarContainer = ({ events, selectedDate, setSelectedDate, days, clickTodayButton, getMonth, moveWeek, handleModal }: CalendarContainerPropsType) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header clickTodayButton={clickTodayButton} moveWeek={moveWeek} getMonth={getMonth} handleModal={handleModal} />
      <Calendar days={days} selectedDate={selectedDate} setSelectedDate={setSelectedDate} events={events} />
    </div>
  );
};

export default CalendarContainer;
