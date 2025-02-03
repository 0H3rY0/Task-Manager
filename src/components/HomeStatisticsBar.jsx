import { MdOutlinePending } from "react-icons/md";
import OwnSelectDayList from "./ui/OwnSelectDayList";
import WelcomeUsername from "./ui/WelcomeUsername";
import CompletedTasks from "./CompletedTasks";

const HomeStatisticsBar = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <WelcomeUsername />
      <div className="flex px-5 py-4 shadow-xl rounded-full bg-gray-200">
        <OwnSelectDayList />
        <CompletedTasks />
        <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 ">
          <span className="font-bold text-2xl flex justify-center items-center gap-1">
            <MdOutlinePending size={30} /> 1
          </span>{" "}
          Created projects
        </p>
      </div>
    </div>
  );
};

export default HomeStatisticsBar;
