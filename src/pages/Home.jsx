import { FaHome } from "react-icons/fa";
import HomeNewsSection from "../components/HomeNewsSection";
import HomeStatisticsBar from "../components/HomeStatisticsBar";

const Home = () => {
  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start md:gap-0 gap-2">
        <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
          Home <FaHome className="text-blue-500" size={26} />
        </h2>
      </div>
      <HomeStatisticsBar />
      <HomeNewsSection />
    </div>
  );
};

export default Home;
