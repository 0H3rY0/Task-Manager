import { CgGoogleTasks } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProjectService from "../service/api/projects";
import { v4 as uuidv4 } from "uuid";
import TasksList from "./ui/TasksList";

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
    <div className="w-full flex justify-center py-16  flex-col gap-6">
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
