import { CgGoogleTasks } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import ProjectService from "../service/api/projects";
import { v4 as uuidv4 } from "uuid";
import TasksList from "./ui/TasksList";
import ModalConfigureTask from "./modals/ModalConfigureTask";
import * as Dialog from "@radix-ui/react-dialog";
import { taskSchema } from "../utils/taskSchema";

const Tasks = ({ id }) => {
  const initialTaskState = {
    id: null,
    content: "",
    deadline: "",
    importance: "Low",
  };
  const [task, setTask] = useState(initialTaskState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const inputRef = useRef(null);

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

  const addTask = async () => {
    const newTask = {
      ...task,
      id: uuidv4(),
    };
    try {
      await taskSchema.validate(newTask, { abortEarly: false });

      ProjectService.addTaskToProject(newTask, id);
      setTasks((prev) => [...prev, newTask]);
      setTask(initialTaskState);
      toast("Success! Your task has been added");
      setIsDialogOpen(false);
      setErrors({});
    } catch (error) {
      const newError = {};

      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });

      setErrors(newError);
      console.log(newError);
    }
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
    if (event.key === "Enter" && task.content.trim()) {
      setIsDialogOpen(true);
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full flex justify-center py-16  flex-col gap-6">
      <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
        Tasks <CgGoogleTasks className="text-blue-500" size={32} />
      </h2>
      <div className="flex gap-3 items-center">
        <ModalConfigureTask
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          addTask={addTask}
          task={task}
          onInputChange={onInputChange}
          errors={errors}
        >
          {task.content.trim() ? (
            <Dialog.Trigger>
              <IoMdAdd size={32} className="text-red-600" />
            </Dialog.Trigger>
          ) : (
            <IoMdAdd
              size={32}
              className="text-red-200"
              onClick={() => focusInput()}
            />
          )}
        </ModalConfigureTask>
        <input
          ref={inputRef}
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
