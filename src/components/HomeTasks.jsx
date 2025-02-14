import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";
import HomeTaskList from "./HomeTaskList";
import HomeTaskTableTodayOption from "./ui/HomeTaskTableTodayOption";
import HomeTaskTableWeekOption from "./ui/HomeTaskTableWeekOption";
import HomeTaskTableMonth30DaysOption from "./ui/HomeTaskTableMonth30DaysOption";

const filterTasksByDateRange = (tasks, startDate, endDate) => {
  return tasks.filter((task) => {
    const taskDate = new Date(task.deadline);
    taskDate.setHours(0, 0, 0, 0);

    return taskDate >= startDate && taskDate <= endDate;
  });
};

const HomeTasks = () => {
  const [underlineActive, setUnderlineActive] = useState(1);
  const [allTasks, setAllTasks] = useState([]);
  const [dependTimeTasks, setDependTimeTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const response = await ProjectService.getAllTasks();
      setAllTasks(response);
    };

    getTasks();
  }, []);

  useEffect(() => {
    handleTimeFilter("today");
  }, [allTasks]);

  const handleTimeFilter = (timePeriod) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDate = today;
    let endDate = today;

    if (timePeriod === "today") {
      endDate = new Date(today);
    } else if (timePeriod === "week") {
      endDate = new Date(today);
      endDate.setDate(today.getDate() + 7);
    } else if (timePeriod === "month") {
      endDate = new Date(today);
      endDate.setDate(today.getDate() + 30);
    }

    const filteredTasks = filterTasksByDateRange(allTasks, startDate, endDate);
    setDependTimeTasks(filteredTasks);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="shadow-xl border-2 border-slate-200 p-4 w-full">
        <div className="flex gap-4">
          <div className="bg-black rounded-full text-white flex items-center justify-center">
            image
          </div>
          <div>
            <p className="font-bold text-xl text-slate-800">My Tasks</p>
            <p className="flex gap-2 font-semibold text-slate-600 text-lg">
              <HomeTaskTableTodayOption
                handleTimeFilter={handleTimeFilter}
                setUnderlineActive={setUnderlineActive}
                underlineActive={underlineActive}
                timePeriod="today"
              />
              <HomeTaskTableWeekOption
                handleTimeFilter={handleTimeFilter}
                setUnderlineActive={setUnderlineActive}
                underlineActive={underlineActive}
                timePeriod="week"
              />
              <HomeTaskTableMonth30DaysOption
                handleTimeFilter={handleTimeFilter}
                setUnderlineActive={setUnderlineActive}
                underlineActive={underlineActive}
                timePeriod="month"
              />
            </p>
          </div>
        </div>
        <HomeTaskList dependTimeTasks={dependTimeTasks} />
      </div>
    </div>
  );
};

export default HomeTasks;
