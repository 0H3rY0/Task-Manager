import { FaHome } from "react-icons/fa";
import HomeNewsSection from "../components/HomeNewsSection";
import HomeStatisticsBar from "../components/HomeStatisticsBar";
import { BsCheck2Circle } from "react-icons/bs";

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
      <h2 className="font-semibold text-2xl mb-2 text-slate-800 flex items-center gap-2 mt-5">
        Tasks <BsCheck2Circle size={30} />
      </h2>
      <div className="w-full flex justify-center ">
        <div className="shadow-xl border-2 border-slate-200 p-4 w-4/5">
          {/* gora */}
          <div className="flex gap-4">
            <div className="bg-black rounded-full text-white flex items-center justify-center">
              image
            </div>
            <div>
              <p className="font-bold text-xl text-slate-800">My Tasks</p>
              <p className="flex gap-2 font-semibold text-slate-600 text-lg">
                <span className="underline">Today</span>
                <span>week</span>
                <span>month</span>
              </p>
            </div>
          </div>
          {/* dol */}
          <div className="w-full mt-4">
            <ul>
              <li className="border-b-2 border-slate-200 px-2 py-1 mb-2 flex gap-2 items-center justify-between text-lg text-slate-700">
                <p className="flex items-center justify-start gap-2">
                  <BsCheck2Circle size={30} /> Twitter Content Plan
                </p>

                <div className="flex items-center gap-4">
                  <button className="btn bg-white border-2 border-blue-500 rounded-md px-2 py-1 font-semibold text-md">
                    show
                  </button>
                  <p className="font-semibold">19-10-2025</p>
                  <p className="font-semibold">Medium</p>
                </div>
              </li>
              <li className="border-b-2 border-slate-200 px-2 py-1 mb-2 flex gap-2 items-center justify-between text-lg text-slate-700">
                <p className="flex items-center justify-start gap-2">
                  <BsCheck2Circle size={30} /> Twitter Content Plan
                </p>

                <div className="flex items-center gap-4">
                  <button className="btn bg-white border-2 border-blue-500 rounded-md px-2 py-1 font-semibold text-md">
                    show
                  </button>
                  <p className="font-semibold">19-10-2025</p>
                  <p className="font-semibold">Medium</p>
                </div>
              </li>
              <li className="border-b-2 border-slate-200 px-2 py-1 mb-2 flex gap-2 items-center justify-between text-lg text-slate-700">
                <p className="flex items-center justify-start gap-2">
                  <BsCheck2Circle size={30} /> Twitter Content Plan
                </p>

                <div className="flex items-center gap-4">
                  <button className="btn bg-white border-2 border-blue-500 rounded-md px-2 py-1 font-semibold text-md">
                    show
                  </button>
                  <p className="font-semibold">19-10-2025</p>
                  <p className="font-semibold">Medium</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
