import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProjectService from "../../service/api/projects";
import ModalCheckAgreement from "../modals/ModalCheckAgreement";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddProjectForm = () => {
  const [project, setProject] = useState({
    id: null,
    Title: "",
    Description: "",
    Deadline: "",
    Importance: "",
  });

  const navigator = useNavigate();

  const onInputChnage = (e) => {
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitProject = () => {
    // e.preventDefault();

    const newProject = {
      ...project,
      id: uuidv4(),
    };

    ProjectService.createProject(newProject);

    setProject({
      id: null,
      Title: "",
      Description: "",
      Deadline: "",
      Importance: "",
    });

    toast("Success!!");
    navigator("/project/all");
  };

  return (
    <form action="">
      <label htmlFor="Title" className="font-bold text-lg text-slate-700 ml-1">
        Title
      </label>
      <input
        name="Title"
        value={project.Title}
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
        value={project.Description}
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
        value={project.Deadline}
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
        value={project.Importance}
        onChange={(e) => onInputChnage(e)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low" defaultChecked>
          Low
        </option>
      </select>

      <ModalCheckAgreement
        func={handleSubmitProject}
        titleText={"Are you sure you want to add this project?"}
        btnText={"Confirm"}
      >
        <Dialog.Trigger>
          <div className="btn-gray mt-10" type="submit">
            Add Project
          </div>
        </Dialog.Trigger>
      </ModalCheckAgreement>
    </form>
  );
};

export default AddProjectForm;
