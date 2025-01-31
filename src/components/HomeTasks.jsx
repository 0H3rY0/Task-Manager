import { BsCheck2Circle } from "react-icons/bs";

const HomeTasks = () => {
  return (
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
  );
};

export default HomeTasks;
