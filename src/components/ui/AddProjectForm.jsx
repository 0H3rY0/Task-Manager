import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProjectService from "../../service/api/projects";
import ModalCheckAgreement from "../modals/ModalCheckAgreement";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import FileInput from "./FileInput";

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
  const navigator = useNavigate();

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
        Importance: "Low",
        ImageUrl: "",
        Tasks: [],
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:3000/upload",
          formData
        );

        const data = response.data;
        console.log("Uploaded file URL:", data.url);

        setProject((prev) => ({
          ...prev,
          ImageUrl: data.url,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <form action="">
      <FileInput
        name={"Title"}
        description={"Title"}
        onChange={(e) => onInputChnage(e)}
        errors={errors.Title}
      />
      <FileInput
        name={"Description"}
        description={"Description"}
        onChange={(e) => onInputChnage(e)}
        errors={errors.Description}
      />
      <FileInput
        name={"Deadline"}
        description={"Deadline"}
        onChange={(e) => onInputChnage(e)}
        type={"date"}
        onClick={(e) => e.target.showPicker()}
        errors={errors.Deadline}
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
      <FileInput
        name={"ImageUrl"}
        description={"Add image if you want"}
        onChange={(e) => handleFileUpload(e)}
        type={"file"}
      />
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
