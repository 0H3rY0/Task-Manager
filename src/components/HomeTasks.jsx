import { useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import ProjectService from "../service/api/projects";

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
    console.log(dependTimeTasks);
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

  return (
    <div className="w-full flex justify-center ">
      <div className="shadow-xl border-2 border-slate-200 p-4 w-4/5">
        {/* gora */}
        <div className="flex gap-4">
          <div className="bg-black rounded-full text-white flex items-center justify-center">
            image
          </div>
          <div>
            <p className="font-bold text-xl text-slate-800">My Tasks</p>
            <p className="flex gap-2 font-semibold text-slate-600 text-lg">
              <span
                onClick={() => {
                  todayTasks();
                  setUnderlineActive(1);
                }}
                className={
                  `hover:underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer ` +
                  ` ${
                    underlineActive === 1 &&
                    " underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer"
                  } `
                }
              >
                Today
              </span>
              <span
                onClick={() => {
                  weekTasks();
                  setUnderlineActive(2);
                }}
                className={
                  `hover:underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer ` +
                  ` ${
                    underlineActive === 2 &&
                    "underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer"
                  } `
                }
              >
                week
              </span>
              <span
                onClick={() => {
                  setUnderlineActive(3);
                }}
                className={
                  `hover:underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer ` +
                  ` ${
                    underlineActive === 3 &&
                    "underline decoration-blue-500 decoration-2 underline-offset-8 cursor-pointer"
                  } `
                }
              >
                month
              </span>
            </p>
          </div>
        </div>
        {/* dol */}
        <div className="w-full mt-4">
          <ul>
            {dependTimeTasks.map((item) => (
              <li
                key={item.id}
                className="border-b-2 border-slate-200 px-2 py-1 mb-2 flex gap-2 items-center justify-between text-lg text-slate-700"
              >
                <p className="flex items-center justify-start gap-2">
                  <BsCheck2Circle size={30} /> {item.content}
                </p>

                <div className="flex items-center gap-4">
                  <button className="btn bg-white border-2 border-blue-500 rounded-md px-2 py-1 font-semibold text-md">
                    show
                  </button>
                  <p className="font-semibold">{item.deadline}</p>
                  <p className="font-semibold">{item.importance}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeTasks;
