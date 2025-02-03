import { useState, useEffect } from "react";
import ProjectService from "../service/api/projects";
import { IoCheckmarkSharp } from "react-icons/io5";

const CompletedTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [dependTasks, setDependTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const response = await ProjectService.getAllTasks();
      setAllTasks(response);
    };

    getTasks();
  }, []);

  useEffect(() => {
    yearStats();
    // monthStats();
    // weekStats();
  }, [allTasks]);

  const weekStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    setDependTasks(
      allTasks.filter((task) => {
        const taskLastUpdateDate = new Date(task.status.lastUpdatedAt);
        taskLastUpdateDate.setHours(0, 0, 0, 0);
        console.log(task.done);

        return taskLastUpdateDate > lastWeek && task.status.done;
      })
    );
  };

  const monthStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastMonth = new Date(today);
    lastMonth.setDate(today.getDate() - 30);

    setDependTasks(
      allTasks.filter((task) => {
        const taskLastUpdateDate = new Date(task.status.lastUpdatedAt);
        taskLastUpdateDate.setHours(0, 0, 0, 0);
        console.log(task.done);

        return taskLastUpdateDate > lastMonth && task.status.done;
      })
    );
  };

  const yearStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastYear = new Date(today);
    lastYear.setDate(today.getDate() - 365);

    setDependTasks(
      allTasks.filter((task) => {
        const taskLastUpdateDate = new Date(task.status.lastUpdatedAt);
        taskLastUpdateDate.setHours(0, 0, 0, 0);
        console.log(task.done);

        return taskLastUpdateDate > lastYear && task.status.done;
      })
    );
  };

  return (
    <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 border-r-2 border-gray-400">
      <span className="font-bold text-2xl flex justify-center items-center gap-1">
        <IoCheckmarkSharp size={30} /> {dependTasks.length}
      </span>
      Tasks completed
    </p>
  );
};

export default CompletedTasks;
