import { FaProjectDiagram } from "react-icons/fa";
import { SiTask } from "react-icons/si";
<SiTask size={70} />;

const ProjectList = () => {
  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
          Projects <FaProjectDiagram className="text-orange-500" size={26} />
        </h2>
        <button className="btn-gray flex items-center gap-2">
          <span className="text-2xl">+</span> Create Project
        </button>
      </div>

      <div>
        <ul className="flex flex-col gap-6">
          <li className=" py-4 px-4 rounded-md flex items-center min-h-30 shadow-md">
            <div className="flex justify-center items-center w-1/5">
              <SiTask size={70} className="text-orange-500" />;
            </div>
            <div className="w-3/5 flex flex-col gap-3">
              <div>
                <h3 className="font-bold text-2xl text-slate-700 ">Title</h3>
                <p className="font-semibold text-lg text-slate-500 ">
                  description
                </p>
              </div>
              <div>
                <p className="text-md text-slate-500">
                  maybe count of taks in project
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end w-1/5 gap-14">
              <p className="flex gap-1 font-semibold text-slate-700">
                Importance: <span className="text-orange-500">important</span>
              </p>
              <p className="flex gap-1 font-semibold text-slate-700">
                DeadLine: <span className="text-orange-500">12.01.2025</span>
              </p>
            </div>
          </li>
          <li className="py-4 px-4 rounded-md flex items-center min-h-30 shadow-md">
            <div className="flex justify-center items-center w-1/5">
              <SiTask size={70} className="text-orange-500" />;
            </div>
            <div className="w-3/5 flex flex-col gap-3">
              <div>
                <h3 className="font-bold text-2xl text-slate-700 ">Title</h3>
                <p className="font-semibold text-lg text-slate-500 ">
                  description
                </p>
              </div>
              <div>
                <p className="text-md text-slate-500">Content</p>
              </div>
            </div>
            <div className=" flex flex-col justify-end items-end w-1/5 gap-14">
              <p className="flex gap-1 font-semibold text-slate-700">
                Importance: <span className="text-orange-500">important</span>
              </p>
              <p className="flex gap-1 font-semibold text-slate-700">
                DeadLine: <span className="text-orange-500">12.01.2025</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;
