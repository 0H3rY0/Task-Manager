import { CgGoogleTasks } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProjectService from "../service/api/projects";
import { v4 as uuidv4 } from "uuid";
import TasksList from "./ui/TasksList";
import ModalConfigureTask from "./modals/ModalConfigureTask";
import * as Dialog from "@radix-ui/react-dialog";

const Tasks = ({ id }) => {
  const initialTaskState = {
    id: null,
    content: "",
    deadline: "",
    importance: "",
  };
  const [task, setTask] = useState(initialTaskState);

  const onInputChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
      ...task,
      id: uuidv4(),
    };
    ProjectService.addTaskToProject(newTask, id);
    setTasks((prev) => [...prev, newTask]);
    setTask(initialTaskState);
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
      addTask();
    }
  };

  return (
    <div className="w-full flex justify-center py-16  flex-col gap-6">
      <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
        Tasks <CgGoogleTasks className="text-blue-500" size={32} />
      </h2>
      <div className="flex gap-3">
        <ModalConfigureTask>
          <Dialog.Trigger>
            <IoMdAdd size={32} className="text-red-500" />
            {/* onClick={addTask} */}
          </Dialog.Trigger>
        </ModalConfigureTask>
        <input
          name="content"
          onChange={(e) => onInputChange(e)}
          value={task.content}
          onKeyDown={handleEnterPress}
          type="text"
          placeholder="Add task"
          className="classicInput"
        />
      </div>
      <div>
        {tasks.length > 0 ? (
          <TasksList
            tasks={tasks}
            removeTask={removeTask}
            modifyTask={modifyTask}
            id={id}
          />
        ) : (
          <p className="font-bold text-2xl text-slate-500 text-center">
            No Tasks
          </p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
