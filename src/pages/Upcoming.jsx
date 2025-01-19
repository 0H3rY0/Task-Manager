import { IoMdTimer } from "react-icons/io";
import TasksList from "../components/ui/TasksList";
import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";

const Upcoming = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      const data = await ProjectService.getAllTasks();
      setTasks(data);
    };

    getAllTasks();
  }, []);

  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start md:gap-0 gap-2">
        <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
          Upcoming <IoMdTimer className="text-purple-500" size={30} />
        </h2>
        <div className="flex gap-2">
          <button className="btn-gray flex items-center gap-2">Projects</button>
          <button className="btn-gray flex items-center gap-2">Tasks</button>
          <select className="btn-gray">
            <option value="">All</option>
            <option value="">Low</option>
            <option value="">Medium</option>
            <option value="">High</option>
          </select>
        </div>
      </div>

      <TasksList tasks={tasks} />
    </div>
  );
};

export default Upcoming;
