import ReservationItem from "./ReservationItem";

interface propsType {
  events: any[];
}

const ReservationContainer = ({ events }: propsType) => {
  return (
    <div className="flex justify-between w-full h-full p-2">
      <div className="flex h-[3.75rem] flex-wrap items-start">
        {events &&
          events.map((event, index) => {
            if (index < 4) {
              return <ReservationItem key={index} id={event.key} purposeType={event.purposeType} petName={event.petInfo.name} />;
            }
          })}
      </div>
      {events && <div className="flex">{events.length > 3 ? <div className="w-6 h-4 mt-auto text-[0.625rem] text-[#808495] font-normal">+{events.length - 3}</div> : ""}</div>}
    </div>
  );
};

export default ReservationContainer;
