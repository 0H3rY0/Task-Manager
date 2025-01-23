import { TiDelete } from "react-icons/ti";
import { RxUpdate } from "react-icons/rx";
import * as Dialog from "@radix-ui/react-dialog";
import ModalModifyTask from "../modals/ModalModifyTask";
import ModalCheckAgreement from "../modals/ModalCheckAgreement";
import { useNavigate } from "react-router";
import ProjectService from "../../service/api/projects";

const TasksList = ({
  tasks = [],
  removeTask,
  modifyTask,
  id,
  modifyTaskErrors,
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

  return (
    <ul className="flex flex-col">
      {tasks.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center border-2 border-slate-200 mt-5 rounded-md"
          >
            <li
              className="py-4 px-4 
        text-lg font-semibold text-slate-700 w-full flex justify-between"
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
                    <span className="text-purple-500">{item.deadline}</span>
                  </p>
                  <p>
                    Pioriety:{" "}
                    <span className="text-purple-500">{item.importance}</span>
                  </p>
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
