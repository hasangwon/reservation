import type { NextPage } from "next";
import Calendar from "../components/Calendar";

const Home: NextPage = () => {
  return (
    <div className="bg-[#f5f8ff]">
      <Calendar />
    </div>
  );
};

export default Home;
