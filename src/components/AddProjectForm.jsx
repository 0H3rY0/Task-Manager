import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProjectService from "../service/api/projects";
import ModalCheckAgreement from "./modals/ModalCheckAgreement";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import FileInput from "./ui/FileInput";
import FileSelect from "./ui/FileSelect";
import { useFileUpload } from "../hooks/useFileUpload";
import { projectSchema } from "../utils/projectSchema";

const AddProjectForm = () => {
  const projectState = {
    id: null,
    Title: "",
    Description: "",
    Deadline: "",
    Importance: "Low",
    ImageUrl: "",
    Tasks: [],
  };

  const [project, setProject] = useState(projectState);
  const [errors, setErrors] = useState({});
  const navigator = useNavigate();
  let priority = ["High", "Medium", "Low"];
  const { handleFileUpload, UploadImageError, uploadedFileUrl } =
    useFileUpload();

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
        ImageUrl: uploadedFileUrl,
      };

      ProjectService.createProject(newProject);

      setProject(projectState);

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
      <FileSelect
        value={project.Importance}
        onChange={(e) => onInputChnage(e)}
        options={priority}
      />
      <FileInput
        name={"ImageUrl"}
        description={"Add image if you want"}
        onChange={(e) => handleFileUpload(e)}
        type={"file"}
        errors={UploadImageError}
      />
      <ModalCheckAgreement
        func={handleSubmitProject}
        titleText={"Are you sure you want to add this proejct"}
        btnText={"Confirm"}
      >
        <div
          className="btn-red border-8 border-red-500 text-center mt-10"
          type="submit"
        >
          Add Project
        </div>
      </ModalCheckAgreement>
    </form>
  );
};

export default AddProjectForm;
