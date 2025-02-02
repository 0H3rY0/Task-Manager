import { IoCheckmarkSharp } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import OwnSelectDayList from "./ui/OwnSelectDayList";
import { days } from "../service/data/days";
import { months } from "../service/data/months";
import { useUserStore } from "../store/useUserStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";

const HomeStatisticsBar = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [dependTasks, setDependTasks] = useState([]);
  const todayDate = new Date();
  const day = days[todayDate.getDay()];
  const month = months[todayDate.getMonth()];
  const date = day + ", " + month + " " + todayDate.getDate();

  const { user } = useUserStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const getTasks = async () => {
      const response = await ProjectService.getAllTasks();
      setAllTasks(response);
    };

    getTasks();
  }, []);

  useEffect(() => {
    weekStats();
  }, [allTasks]);

  const weekStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    setDependTasks(
      allTasks.filter((task) => {
        const taskDate = new Date(task.deadline);
        taskDate.setHours(0, 0, 0, 0);
        console.log(task.done);

        return taskDate >= today && taskDate < nextWeek && task.done;
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <span className="text-slate-800 text-lg">{date}</span>
      <p className="text-slate-800 text-4xl font-semibold">
        {isAuthenticated ? "Hello, " + user.username : "Hello"}
      </p>

      <div className="flex px-5 py-4 shadow-xl rounded-full bg-gray-200">
        <OwnSelectDayList />
        <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 border-r-2 border-gray-400">
          <span className="font-bold text-2xl flex justify-center items-center gap-1">
            <IoCheckmarkSharp size={30} /> {dependTasks.length}
          </span>
          Tasks completed
        </p>
        <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 ">
          <span className="font-bold text-2xl flex justify-center items-center gap-1">
            <MdOutlinePending size={30} /> 1
          </span>{" "}
          pending projects
        </p>
      </div>
    </div>
  );
};

export default HomeStatisticsBar;
