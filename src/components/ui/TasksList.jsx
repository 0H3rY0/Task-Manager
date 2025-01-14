import { TiDelete } from "react-icons/ti";
import { RxUpdate } from "react-icons/rx";
import * as Dialog from "@radix-ui/react-dialog";
import ModalModifyTask from "../modals/ModalModifyTask";
import ModalCheckAgreement from "../modals/ModalCheckAgreement";

const TasksList = ({ tasks = [], removeTask, modifyTask, id }) => {
  console.log("to sa taski:" + tasks);
  return (
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
  );
};

export default TasksList;
