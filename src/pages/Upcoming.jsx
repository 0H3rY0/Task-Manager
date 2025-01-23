import { IoMdTimer } from "react-icons/io";
import TasksList from "../components/ui/TasksList";
import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";
import AllProjects from "./AllProjects";
import ProjectList from "../components/ProjectList";

const Upcoming = () => {
  const [tasks, setTasks] = useState([]);
  const [updetedTasks, setUpdatedTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [updetedProjects, setUpdatedProjects] = useState([]);
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

      {contentState === "tasks" ? (
        <TasksList tasks={updetedTasks} />
      ) : (
        <ProjectList projectsList={updetedProjects} />
      )}
    </div>
  );
};

export default Upcoming;
