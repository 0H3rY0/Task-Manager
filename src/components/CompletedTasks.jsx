// import { useState, useEffect } from "react";
// import ProjectService from "../service/api/projects";
import { IoCheckmarkSharp } from "react-icons/io5";

const CompletedTasks = ({ dependTasks }) => {
  //   const [allTasks, setAllTasks] = useState([]);
  //   const [dependTasks, setDependTasks] = useState([]);

  //   useEffect(() => {
  //     const getTasks = async () => {
  //       const response = await ProjectService.getAllTasks();
  //       setAllTasks(response);
  //     };

  //     getTasks();
  //   }, []);

  //   useEffect(() => {
  //     completedTasksStats(7);
  //   }, [allTasks]);

  //   const completedTasksStats = (lastUpdate = 7) => {
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);

  //     const lastUpdatedAt = new Date(today);
  //     lastUpdatedAt.setDate(today.getDate() - lastUpdate);

  //     setDependTasks(
  //       allTasks.filter((task) => {
  //         const taskLastUpdateDate = new Date(task.status.lastUpdatedAt);
  //         taskLastUpdateDate.setHours(0, 0, 0, 0);
  //         console.log(task.done);

  //         return taskLastUpdateDate > lastUpdatedAt && task.status.done;
  //       })
  //     );
  //   };

  return (
    <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 md:border-r-2 md:border-gray-400">
      <span className="font-bold text-2xl flex justify-center items-center gap-1">
        <IoCheckmarkSharp size={30} /> {dependTasks.length}
      </span>
      Tasks completed
    </p>
  );
};

export default CompletedTasks;
