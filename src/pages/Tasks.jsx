import { CgGoogleTasks } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { RxUpdate } from "react-icons/rx";
import * as Dialog from "@radix-ui/react-dialog";
import ModalModifyTask from "../components/modals/ModalModifyTask";
import ModalDeleteTask from "../components/modals/ModalDeleteTask";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");

  const addTask = () => {
    setTasks([...tasks, inputText]);
    setInputText("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((item, i) => i !== index));
  };

  const modifyTask = (i, newItem) => {
    setTasks(
      tasks.map((item, index) => {
        if (index === i) {
          item = newItem;
        }

        return item;
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
          className="w-full px-3 rounded-full focus:border-white focus:ring-2 focus:ring-red-300 focus:outline-none transition"
        />
      </div>
      <div>
        <ul className="flex flex-col">
          {tasks.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className="flex items-center border-2 border-slate-200 mt-5 rounded-md"
                >
                  <li
                    className="py-4 px-2 
                text-lg font-semibold text-slate-700 w-4/5"
                  >
                    {item}
                  </li>
                  <div className=" w-1/5 py-4 px-2 flex items-center gap-5 justify-end mr-5">
                    <ModalDeleteTask removeTask={removeTask} index={index}>
                      <Dialog.Trigger>
                        <TiDelete
                          className="text-red-500 hover:text-red-300 cursor-pointer"
                          size={40}
                          // onClick={() => removeTask(index)}
                        />
                      </Dialog.Trigger>
                    </ModalDeleteTask>

                    <ModalModifyTask
                      value={item}
                      index={index}
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
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
