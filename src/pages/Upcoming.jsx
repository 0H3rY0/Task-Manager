import { IoMdTimer } from "react-icons/io";
import TasksList from "../components/TasksList";
import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";
import ProjectList from "../components/ProjectList";
import ClipLoader from "react-spinners/ClipLoader";

const Upcoming = () => {
  const [tasks, setTasks] = useState([]);
  const [updatedTasks, setUpdatedTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [updatedProjects, setUpdatedProjects] = useState([]);
  const [contentState, setContentState] = useState("tasks");

  useEffect(() => {
    const getAllTasks = async () => {
      const data = await ProjectService.getAllTasks();
      const sortedDataByDeadline = data.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
      setTasks(sortedDataByDeadline);
      setUpdatedTasks(sortedDataByDeadline);
    };

    getAllTasks();
  }, []);

  useEffect(() => {
    const getAllProjects = async () => {
      const data = await ProjectService.getAll();

      setProjects(data);
      setUpdatedProjects(data);
    };
    getAllProjects();
  }, []);

  const handlePiorietyChange = (e) => {
    const selectedPioriety = e.target.value;

    const filterByImportance = (items, importanceKey) => {
      return selectedPioriety === "ALL"
        ? items
        : items.filter((item) => item[importanceKey] === selectedPioriety);
    };

    const updatedTasks = filterByImportance(tasks, "importance");
    const updatedProjects = filterByImportance(projects, "Importance");

    setUpdatedTasks(updatedTasks);
    setUpdatedProjects(updatedProjects);
  };

  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start md:gap-0 gap-2">
        <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
          Upcoming {contentState}{" "}
          <IoMdTimer className="text-purple-500" size={30} />
        </h2>
        <div className="flex gap-2">
          <button
            className="btn-gray flex items-center gap-2"
            onClick={() => setContentState("projects")}
          >
            Projects
          </button>
          <button
            className="btn-gray flex items-center gap-2"
            onClick={() => setContentState("tasks")}
          >
            Tasks
          </button>
          <select className="btn-gray" onChange={handlePiorietyChange}>
            <option value="ALL">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {updatedTasks.length > 0 || updatedProjects.length > 0 ? (
        contentState === "tasks" ? (
          updatedTasks.length > 0 ? (
            <TasksList tasks={updatedTasks} isPurple={true} />
          ) : (
            <div className="w-full flex justify-center py-52 flex-col gap-6">
              <p className="font-bold text-2xl text-slate-500 text-center">
                No Tasks
              </p>
            </div>
          )
        ) : updatedProjects.length > 0 ? (
          <ProjectList projectsList={updatedProjects} isPurple={true} />
        ) : (
          <div className="w-full flex justify-center py-52 flex-col gap-6">
            <p className="font-bold text-2xl text-slate-500 text-center">
              No Projects
            </p>
          </div>
        )
      ) : (
        <div className="w-full flex justify-center text-center pt-40  gap-6">
          <ClipLoader className="text-center" color="#A855F7" size={150} />
        </div>
      )}
    </div>
  );
};

export default Upcoming;
