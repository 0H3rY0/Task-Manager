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

const Tasks = ({ id, updateFlag }) => {
  const initialTaskState = {
    id: null,
    content: "",
    deadline: "",
    importance: "Low",
  };
  const [task, setTask] = useState(initialTaskState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectDeadline, setProjectDeadline] = useState("");
  const [errors, setErrors] = useState({});
  const [modifyTaskErrors, setModifyTaskErrors] = useState({});
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

  useEffect(() => {
    const getProject = async () => {
      try {
        const data = await ProjectService.getProject(id);
        const newDeadline = data.Deadline;

        if (newDeadline !== projectDeadline) {
          setProjectDeadline(newDeadline);
          console.log("Zaktualizowany deadline:", newDeadline);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania projektu:", error);
      }
    };

    getProject();
  }, [id, updateFlag]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const data = await ProjectService.getProject(id);
        const newDeadline = data.Deadline;

        // Aktualizujemy stan 'projectDeadline' tylko jeśli uległ zmianie
        if (newDeadline !== projectDeadline) {
          setProjectDeadline(newDeadline);
          console.log("Zaktualizowany deadline:", newDeadline);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania projektu:", error);
      }
    };

    // Wywołujemy funkcję getProject za każdym razem, gdy zmienia się 'id'
    getProject();
  }, [id]); // Effect wywoła się, gdy zmieni się 'id'

  // Jeśli chcesz wykonać jakąś logikę po zmianie 'projectDeadline', użyj drugiego useEffect
  useEffect(() => {
    if (projectDeadline) {
      console.log(
        "Deadline projektu został zaktualizowany na:",
        projectDeadline
      );
    }
  }, [projectDeadline]); // Ten efekt będzie wywoływany, gdy 'projectDeadline' się zmieni

  const addTask = async () => {
    const newTask = {
      ...task,
      id: uuidv4(),
    };
    try {
      await taskSchema.validate(newTask, {
        context: { projectDeadline: new Date(projectDeadline) }, // Przykładowa maksymalna data
        abortEarly: false,
      });

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

  const modifyTask = async (taskId, newTask, callback) => {
    // const newItem = {
    //   id: taskId,
    //   content: newItemText,
    // };

    try {
      await taskSchema.validate(newTask, {
        context: { projectDeadline: new Date(projectDeadline) },
        abortEarly: false,
      });

      console.log("to jest projectId: " + id);
      ProjectService.updateProjectTask(newTask.id, id, newTask);
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              content: newTask.content,
              deadline: newTask.deadline,
              importance: newTask.importance,
            };
          }
          return task;
        })
      );
      if (callback) callback(false);
      setModifyTaskErrors({});
    } catch (error) {
      const newError = {};

      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });

      setModifyTaskErrors(newError);
      console.log(newError);
    }
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
            modifyTaskErrors={modifyTaskErrors}
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
