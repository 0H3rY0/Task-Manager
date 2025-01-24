import { FaProjectDiagram } from "react-icons/fa";
import { SiTask } from "react-icons/si";
import { NavLink } from "react-router";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";
import ClipLoader from "react-spinners/ClipLoader";
import ProjectList from "../components/ProjectList";

const AllProjects = () => {
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
  }, []);

  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start md:gap-0 gap-2">
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
          <ProjectList projectsList={projectsList} />
        ) : (
          <div className="w-full flex justify-center text-center pt-40 items-center gap-6">
            {error ? (
              <p className="font-bold text-2xl text-slate-500 text-center">
                Project Failed to Load{" "}
              </p>
            ) : spinnserLoader ? (
              <ClipLoader className="text-center" color="#ff6300" size={150} />
            ) : (
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

export default AllProjects;
