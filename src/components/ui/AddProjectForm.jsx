import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddProjectForm = ({ setProjectsList, projectsList }) => {
  const [project, setProject] = useState({
    id: null,
    Title: "",
    Description: "",
    Deadline: "",
    Importance: "",
  });

  const onInputChnage = (e) => {
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();

    const newProject = {
      ...project,
      id: uuidv4(),
    };

    setProjectsList([...projectsList, newProject]);
    setProject({
      id: null,
      Title: "",
      Description: "",
      Deadline: "",
      Importance: "",
    });
  };

  return (
    <form action="" onSubmit={(e) => handleSubmitProject(e)}>
      <label htmlFor="Title" className="font-bold text-lg text-slate-700 ml-1">
        Title
      </label>
      <input
        name="Title"
        onChange={(e) => onInputChnage(e)}
        type="text"
        className="classicInput mb-3"
        placeholder="Write a title "
      />

      <label
        htmlFor="Description"
        className="font-bold text-lg text-slate-700 ml-1"
      >
        Description
      </label>
      <input
        name="Description"
        onChange={(e) => onInputChnage(e)}
        type="text"
        className="classicInput mb-3"
        placeholder="Write a Description"
      />

      <label
        htmlFor="Deadline"
        className="font-bold text-lg text-slate-700 ml-1"
      >
        Deadline
      </label>
      <input
        defaultValue={""}
        name="Deadline"
        onChange={(e) => onInputChnage(e)}
        type="date"
        className="classicInput mb-3 text-slate-400"
      />

      <label
        htmlFor="Importance"
        className="font-bold text-lg text-slate-700 ml-1"
      >
        priority
      </label>
      <select
        className="block text-slate-400"
        name="Importance"
        onChange={(e) => onInputChnage(e)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low" defaultChecked>
          Low
        </option>
      </select>

      <button className="btn-gray mt-10" type="submit">
        Add Project
      </button>
    </form>
  );
};

export default AddProjectForm;
