import { IoMdTimer } from "react-icons/io";
import TasksList from "../components/ui/TasksList";
import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";

const Upcoming = () => {
  const [tasks, setTasks] = useState([]);
  const [updetedTasks, setUpdatedTasks] = useState([]);

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

  const handlePiorietyChange = (e) => {
    const selectedPioriety = e.target.value;

    switch (selectedPioriety) {
      case "ALL":
        setUpdatedTasks(tasks);
        break;
      case "Low": {
        let updateTasks = tasks.filter((task) => task.importance === "Low");
        setUpdatedTasks(updateTasks);
        break;
      }
      case "Medium": {
        let updateTasks = tasks.filter((task) => task.importance === "Medium");
        setUpdatedTasks(updateTasks);
        break;
      }
      case "High": {
        let updateTasks = tasks.filter((task) => task.importance === "High");
        setUpdatedTasks(updateTasks);
        break;
      }
    }
  };

  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start md:gap-0 gap-2">
        <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
          Upcoming <IoMdTimer className="text-purple-500" size={30} />
        </h2>
        <div className="flex gap-2">
          <button className="btn-gray flex items-center gap-2">Projects</button>
          <button className="btn-gray flex items-center gap-2">Tasks</button>
          <select className="btn-gray" onChange={handlePiorietyChange}>
            <option value="ALL">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <TasksList tasks={updetedTasks} />
    </div>
  );
};

export default Upcoming;
