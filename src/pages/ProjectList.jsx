import { FaProjectDiagram } from "react-icons/fa";
import { SiTask } from "react-icons/si";
import { NavLink } from "react-router";
import { IoMdAdd } from "react-icons/io";
// import { projects } from "../service/data/projects";
import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";

const ProjectList = () => {
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    const getAllProjects = async () => {
      const data = await ProjectService.getAll();
      setProjectsList(data);
    };

    getAllProjects();
  }, [projectsList]);

  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
          Projects <FaProjectDiagram className="text-orange-500" size={26} />
        </h2>
        <NavLink to="/project/create">
          <button className="btn-gray flex items-center gap-2">
            <IoMdAdd size={20} /> Create Project
          </button>
        </NavLink>
      </div>

      <div>
        <ul className="flex flex-col gap-6">
          {projectsList.map((item, index) => (
            <li
              key={index}
              className=" py-4 px-4 rounded-md flex items-center min-h-30 shadow-md"
            >
              <div className="flex justify-center items-center w-1/5">
                <SiTask size={70} className="text-orange-500" />;
              </div>
              <div className="w-3/5 flex flex-col gap-3">
                <div>
                  <h3 className="font-bold text-2xl text-slate-700 ">
                    {item.Title}
                  </h3>
                  <p className="font-semibold text-lg text-slate-500 ">
                    {item.Description}
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
                  Importance:{" "}
                  <span className="text-orange-500">{item.Importance}</span>
                </p>
                <p className="flex gap-1 font-semibold text-slate-700">
                  DeadLine:{" "}
                  <span className="text-orange-500">{item.Deadline}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;
