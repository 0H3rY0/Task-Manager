import { FaProjectDiagram } from "react-icons/fa";
import { SiTask } from "react-icons/si";
import { NavLink } from "react-router";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";
import ClipLoader from "react-spinners/ClipLoader";

const ProjectList = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [spinnserLoader, setSpinnerLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const data = await ProjectService.getAll();
        data.length > 0 ? setProjectsList(data) : setSpinnerLoader(false);
      } catch (error) {
        console.log("project load failed: " + error);
        setError(true);
      }
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
        {projectsList.length > 0 ? (
          <ul className="flex flex-col gap-6">
            {projectsList.map((item, index) => (
              <li
                key={index}
                className=" py-4 px-4 rounded-md flex items-center min-h-30 shadow-md"
              >
                <div className="flex justify-center items-center w-1/5">
                  {item.ImageUrl !== "" ? (
                    <img
                      className="w-[100px] h-[100px]"
                      src={item.ImageUrl}
                    ></img>
                  ) : (
                    <SiTask size={70} className="text-orange-500" />
                  )}
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
                    <NavLink to={`/project/${item.id}`}>
                      <button className="btn-gray px-24">Watch more</button>
                    </NavLink>
                  </div>
                </div>
                <div className="flex flex-col justify-end items-end w-1/5 gap-14">
                  <p className="flex gap-1 font-semibold text-slate-700">
                    Importance:{" "}
                    <span className="text-orange-500">{item.Importance}</span>
                  </p>
                  <p className="flex gap-1 font-semibold text-slate-700">
                    DeadLine:{" "}
                    <span className="text-orange-500 whitespace-nowrap">
                      {item.Deadline}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            {error ? (
              // <ClipLoader className="text-center" color="#ff6300" size={150} />
              <p className="font-bold text-2xl text-slate-500 text-center">
                Project Failed to Load{" "}
              </p>
            ) : spinnserLoader ? (
              <ClipLoader className="text-center" color="#ff6300" size={150} />
            ) : (
              // <p className="font-bold text-2xl text-slate-500 text-center">
              //   Project Failed to Load{" "}
              // </p>
              <p className="font-bold text-2xl text-slate-500 text-center">
                No tasks Added yet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
