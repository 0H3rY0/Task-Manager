import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProjectService from "../../service/api/projects";
import ModalCheckAgreement from "../modals/ModalCheckAgreement";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddProjectForm = () => {
  const [project, setProject] = useState({
    id: null,
    Title: "",
    Description: "",
    Deadline: "",
    Importance: "Low",
    ImageUrl: "",
    Tasks: [],
  });

  const [errors, setErrors] = useState({});

  let projectSchema = Yup.object({
    Title: Yup.string().required("Title is required"),
    Description: Yup.string().required("Description is required"),
    Deadline: Yup.date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .required("Date is required")
      .min(new Date(), "Date must be later then today"),
    Importance: Yup.string(),
  });

  const navigator = useNavigate();

  const onInputChnage = (e) => {
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitProject = async () => {
    try {
      await projectSchema.validate(project, { abortEarly: false });

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
    } catch (error) {
      const newError = {};

      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });

      setErrors(newError);
    }
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
        className={`classicInput ${errors.Title ? "mb-0" : "mb-3"}`}
        placeholder="Write a title "
      />
      {errors.Title && (
        <p className="text-md font-normal text-red-400 ml-1 mb-3">
          {errors.Title}
        </p>
      )}

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
        className={`classicInput ${errors.Description ? "mb-0" : "mb-3"}`}
        placeholder="Write a Description"
      />
      {errors.Description && (
        <p className="text-md font-normal text-red-400 ml-1 mb-3">
          {errors.Description}
        </p>
      )}

      <label
        htmlFor="Deadline"
        className="font-bold text-lg text-slate-700 ml-1"
      >
        Deadline
      </label>
      <input
        defaultValue={""}
        onClick={(e) => e.target.showPicker()}
        name="Deadline"
        value={project.Deadline}
        onChange={(e) => onInputChnage(e)}
        type="date"
        className={`classicInput ${
          errors.Deadline ? "mb-0" : "mb-3"
        } text-slate-400`}
      />
      {errors.Deadline && (
        <p className="text-md font-normal text-red-400 ml-1 mb-3">
          {errors.Deadline}
        </p>
      )}

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
        titleText={"Are you sure you want to add this proejct"}
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
