import { IoCheckmarkSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";

const HomeStatisticsBar = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <span className="text-slate-800 text-lg">Wednesday, May 24</span>
      <p className="text-slate-800 text-4xl font-semibold">Hello, John</p>

      <div className="flex px-5 py-4 shadow-xl rounded-full bg-gray-200">
        <p className="flex justify-center items-center gap-1 font-semibold text-slate-800 px-6 py-1 border-r-2 border-gray-400 cursor-pointer">
          My week
          <span>
            <IoIosArrowDown size={20} />
          </span>
        </p>
        <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 border-r-2 border-gray-400">
          <span className="font-bold text-2xl flex justify-center items-center gap-1">
            <IoCheckmarkSharp size={30} /> 0
          </span>{" "}
          Tasks completed
        </p>
        <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 ">
          <span className="font-bold text-2xl flex justify-center items-center gap-1">
            <MdOutlinePending size={30} /> 1
          </span>{" "}
          pending projects
        </p>
      </div>
    </div>
  );
};

export default HomeStatisticsBar;
