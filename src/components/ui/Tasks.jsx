import { CgGoogleTasks } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { RxUpdate } from "react-icons/rx";
import * as Dialog from "@radix-ui/react-dialog";
import ModalModifyTask from "../modals/ModalModifyTask";
import ModalCheckAgreement from "../modals/ModalCheckAgreement";
import { toast } from "react-toastify";
import ProjectService from "../../service/api/projects";
import { v4 as uuidv4 } from "uuid";

const Tasks = ({ id }) => {
  const [inputText, setInputText] = useState("");

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async (id) => {
      const data = await ProjectService.getAppropriateTasks(id);
      setTasks(data);
    };

    getTasks(id);
  }, [id]);

  const addTask = () => {
    const newTask = {
      id: uuidv4(),
      content: inputText,
    };
    ProjectService.addTaskToProject(newTask, id);
    setTasks((prev) => [...prev, newTask]);
    setInputText("");
    toast("Success! Your task has been added");
  };

  const removeTask = (taskId, projectId = id) => {
    ProjectService.deleteAppropriateTask(taskId, projectId);
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast("Success! Your task has been deleted");
  };

  const modifyTask = (taskId, newItemText, projectId = id) => {
    const newItem = {
      id: taskId,
      content: newItemText,
    };

    ProjectService.updateProjectTask(taskId, projectId, newItem);
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return { ...task, content: newItem.content };
        }
        return task;
      })
    );
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      addTask(inputText);
    }
  };

  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
        Tasks <CgGoogleTasks className="text-blue-500" size={32} />
      </h2>
      <div className="flex gap-3">
        <IoMdAdd size={32} className="text-red-500" onClick={addTask} />
        <input
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          onKeyDown={handleEnterPress}
          type="text"
          placeholder="Add task"
          className="classicInput"
        />
      </div>
      <div>
        <ul className="flex flex-col">
          {tasks.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center border-2 border-slate-200 mt-5 rounded-md"
              >
                <li
                  className="py-4 px-2 
                text-lg font-semibold text-slate-700 w-4/5"
                >
                  {item.content}
                </li>
                <div className=" w-1/5 py-4 px-2 flex items-center gap-5 justify-end mr-5">
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
                    value={item.content}
                    taskId={item.id}
                    modifyTask={modifyTask}
                  >
                    <Dialog.Trigger>
                      <RxUpdate
                        className="text-purple-500 hover:text-purple-300"
                        size={30}
                      />
                    </Dialog.Trigger>
                  </ModalModifyTask>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
