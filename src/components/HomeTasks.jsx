import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";
import HomeTaskList from "./HomeTaskList";
import HomeTaskTableTodayOption from "./ui/HomeTaskTableTodayOption";
import HomeTaskTableWeekOption from "./ui/HomeTaskTableWeekOption";
import HomeTaskTableMonth30DaysOption from "./ui/HomeTaskTableMonth30DaysOption";

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
    todayTasks();
  }, [allTasks]);

  const todayTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setDependTimeTasks(
      allTasks.filter((task) => {
        const taskDate = new Date(task.deadline);
        taskDate.setHours(0, 0, 0, 0);

        if (taskDate.getTime() === today.getTime()) {
          return task;
        }
      })
    );
  };

  const weekTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ustawienie początku dnia

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7); // Dodanie 7 dni

    setDependTimeTasks(
      allTasks.filter((task) => {
        const taskDate = new Date(task.deadline);
        taskDate.setHours(0, 0, 0, 0); // Ustawienie początku dnia dla porównania

        if (taskDate >= today && taskDate < nextWeek) {
          return task;
        }
      })
    );
  };

  const monthTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextMonht = new Date(today);
    nextMonht.setDate(today.getDate() + 30);

    setDependTimeTasks(
      allTasks.filter((task) => {
        const taskDate = new Date(task.deadline);
        taskDate.setHours(0, 0, 0, 0);

        if (taskDate >= today && taskDate <= nextMonht) {
          return task;
        }
      })
    );
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="shadow-xl border-2 border-slate-200 p-4 w-full">
        <div className="flex gap-4">
          <div className="bg-black rounded-full text-white flex items-center justify-center">
            image
          </div>
          <div>
            <p className="font-bold text-xl text-slate-800">My Tasks</p>
            <p className="flex gap-2 font-semibold text-slate-600 text-lg">
              <HomeTaskTableTodayOption
                todayTasks={todayTasks}
                setUnderlineActive={setUnderlineActive}
                underlineActive={underlineActive}
              />
              <HomeTaskTableWeekOption
                weekTasks={weekTasks}
                setUnderlineActive={setUnderlineActive}
                underlineActive={underlineActive}
              />
              <HomeTaskTableMonth30DaysOption
                monthTasks={monthTasks}
                setUnderlineActive={setUnderlineActive}
                underlineActive={underlineActive}
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
