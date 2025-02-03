import { TiDelete } from "react-icons/ti";
import { RxUpdate } from "react-icons/rx";
import * as Dialog from "@radix-ui/react-dialog";
import ModalModifyTask from "./modals/ModalModifyTask";
import ModalCheckAgreement from "./modals/ModalCheckAgreement";
import { useNavigate } from "react-router";
import ProjectService from "../service/api/projects";

const TasksList = ({
  tasks = [],
  removeTask,
  modifyTask = () => {},
  id,
  modifyTaskErrors,
  isPurple = false,
}) => {
  const navigate = useNavigate();

  const getProjectByTaskId = async (taskId) => {
    try {
      const projects = await ProjectService.getAll();

      const foundProject = projects.find((project) =>
        project.Tasks.some((task) => task.id === taskId)
      );

      if (foundProject) {
        console.log("znaleziono projekt: " + foundProject.id);
        return foundProject.id;
      } else {
        console.log("nie znaleziono projektu ");
      }
    } catch (error) {
      console.log("error with project id: " + error);
    }
  };

  const goToProject = async (taskId) => {
    const id = await getProjectByTaskId(taskId);
    console.log(id);
    navigate(`/project/${id}`);
  };

  const updateTasksStatus = async (e, taskId, task) => {
    const newTask = {
      ...task,
      status: {
        done: e.target.checked,
        lastUpdatedAt: new Date(),
      },
    };
    modifyTask(taskId, newTask);
  };

  console.log(tasks);

  return (
    <ul className="flex flex-col">
      {tasks.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center border-2 border-slate-200 mt-5 rounded-md "
          >
            <li
              className={
                `py-4 px-4 
        text-lg font-semibold text-slate-700 w-full flex justify-between ` +
                `${
                  item.importance === "Medium"
                    ? `bg-orange-100 `
                    : item.importance === "High"
                    ? `bg-red-100`
                    : "bg-green-100"
                }`
              }
            >
              {item.content}

              <div className="flex items-end justify-end flex-col gap-2">
                {removeTask && modifyTask ? (
                  <div className="flex gap-2">
                    <ModalCheckAgreement
                      func={removeTask}
                      funcParam={item.id}
                      funcParam2={id}
                      titleText={"Are you sure you want to delete this task?"}
                      btnText={"Confirm"}
                    >
                      <Dialog.Trigger>
                        <TiDelete
                          className="text-red-500 hover:text-red-300 cursor-pointer"
                          size={40}
                        />
                      </Dialog.Trigger>
                    </ModalCheckAgreement>

                    <ModalModifyTask
                      // value={item.content}
                      task={item}
                      taskId={item.id}
                      modifyTask={modifyTask}
                      modifyTaskErrors={modifyTaskErrors}
                    >
                      <Dialog.Trigger>
                        <RxUpdate
                          className="text-purple-500 hover:text-purple-300"
                          size={30}
                        />
                      </Dialog.Trigger>
                    </ModalModifyTask>
                  </div>
                ) : (
                  <button
                    className="btn-gray"
                    onClick={() => goToProject(item.id)}
                  >
                    view more
                  </button>
                )}
                <div className="flex flex-col items-end whitespace-nowrap text-[16px]">
                  <p>
                    Deadline:{" "}
                    <span
                      className={
                        `${isPurple ? "text-purple-500" : "text-orange-500"} ` +
                        `whitespace-nowrap `
                      }
                    >
                      {item.deadline}
                    </span>
                  </p>
                  <p>
                    Pioriety:{" "}
                    <span
                      className={
                        `${isPurple ? "text-purple-500" : "text-orange-500"} ` +
                        `whitespace-nowrap `
                      }
                    >
                      {item.importance}
                    </span>
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p>Completed: </p>
                    <label className="inline-flex  items-center cursor-pointer">
                      <input
                        name="receiveUpdatesEmails"
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={item.status.done}
                        onChange={(e) => updateTasksStatus(e, item.id, item)}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </li>
          </div>
        );
      })}
    </ul>
  );
};

export default TasksList;
