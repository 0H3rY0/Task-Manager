import { AiOutlineProject } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Tasks from "../components/Tasks";
import { NavLink, useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import ModalCheckAgreement from "../components/modals/ModalCheckAgreement";
import * as Dialog from "@radix-ui/react-dialog";
import ClipLoader from "react-spinners/ClipLoader";
import { SiTask } from "react-icons/si";
import { useFileUpload } from "../hooks/useFileUpload";
import { MdDriveFileRenameOutline } from "react-icons/md";
import ModalModifyProject from "../components/modals/ModalModifyProject";
import { projectSchema } from "../utils/projectSchema";
import Image from "../components/ui/Image";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState({ Title: "" });
  const [error, setError] = useState(false);
  const [projectUpdateError, setProjectUpdateError] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);

  const navigate = useNavigate();

  const { handleFileUpload, UploadImageError, animationClass } =
    useFileUpload();

  useEffect(() => {
    const getProject = async () => {
      try {
        const data = await ProjectService.getProject(id);
        if (data !== undefined) {
          setProject(data);
        } else {
          navigate("/error-page");
        }
      } catch (error) {
        console.log("failed to load project: " + error);
        setError(true);
      }
    };

    getProject(id);
  }, [id]);

  const deleteProject = (id) => {
    ProjectService.deleteProject(id);

    navigate("/project/all");
    toast("Your project has been deleted");
  };

  const handleUpdateProjectImage = async (e) => {
    await handleFileUpload(
      e,
      (uploadedUrl) => {
        const newProject = {
          ...project,
          ImageUrl: uploadedUrl,
        };

        setProject((prev) => ({
          ...prev,
          ImageUrl: uploadedUrl,
        }));

        ProjectService.updateProject(id, newProject);
      },
      false
    );
  };

  const handelUpdateProject = async (name, newValue, callback) => {
    const newProject = {
      ...project,
      [name]: newValue,
    };

    try {
      await projectSchema.validate(newProject, { abortEarly: false });

      setProject((prev) => ({
        ...prev,
        [name]: newValue,
      }));

      await ProjectService.updateProject(id, newProject);
      if (callback) callback();
      setUpdateFlag((prev) => !prev);
    } catch (error) {
      const firstError = error.inner?.[0]?.message || "Validation failed";
      setProjectUpdateError(firstError);
    }
  };

  return (
    <>
      {project.Title ? (
        <div className="w-4/5 flex justify-center py-16 flex-col gap-6">
          <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-2">
            <h2 className="font-bold text-2xl text-slate-700 flex gap-2 whitespace-nowrap text-start">
              Project <AiOutlineProject className="text-orange-500" size={26} />
            </h2>

            <div className="flex gap-6">
              <NavLink to={"/project/all"}>
                <button className="btn-gray flex items-center gap-2">
                  <IoMdArrowRoundBack size={20} /> Back
                </button>
              </NavLink>

              <ModalCheckAgreement
                btnText={"Confirm"}
                titleText={"Are you sure you want to delete this project"}
                func={deleteProject}
                funcParam={id}
              >
                <div className="btn-red flex items-center gap-2">
                  <RiDeleteBack2Fill size={20} /> Delete Project
                </div>
              </ModalCheckAgreement>
            </div>
          </div>

          {/* second container */}
          <div className="flex w-full gap-10 md:flex-row flex-col">
            {/* image, title and Pioreiety container */}
            <div className="w-5/5 md:w-2/5 flex flex-col items-start gap-3">
              <Image
                image={project.ImageUrl}
                updateFunction={handleUpdateProjectImage}
              />
              {UploadImageError && (
                <p
                  className={`text-md font-normal text-red-400 ml-1 mb-3 ${animationClass}`}
                >
                  {UploadImageError}
                </p>
              )}

              <h3 className="text-2xl font-bold text-slate-900 tracking-wide leading-relaxed text-center flex">
                {project.Title}
                <ModalModifyProject
                  title={"Change your Title: "}
                  name={"Title"}
                  func={handelUpdateProject}
                  defaultValue={project.Title}
                  error={projectUpdateError}
                  setError={setProjectUpdateError}
                >
                  <MdDriveFileRenameOutline
                    size={30}
                    className="text-slate-800 inline ml-2"
                  />
                </ModalModifyProject>
              </h3>
              <h4 className="text-lg font-bold text-slate-600 tracking-wide leading-relaxed">
                <p className="flex items-center justify-start gap-2">
                  Pioreiety:
                  <span className="text-orange-500">{project.Importance}</span>
                  <ModalModifyProject
                    title={"Change your pioreiety: "}
                    name={"Importance"}
                    func={handelUpdateProject}
                    defaultValue={project.Importance}
                    error={projectUpdateError}
                    setError={setProjectUpdateError}
                  >
                    <MdDriveFileRenameOutline
                      size={24}
                      className="text-slate-800 inline ml-2"
                    />
                  </ModalModifyProject>
                </p>
                <p className="flex items-center justify-start gap-2 whitespace-nowrap">
                  Deadline:
                  <span className="text-orange-500">{project.Deadline}</span>
                  <ModalModifyProject
                    title={"Change your deadline: "}
                    name={"Deadline"}
                    func={handelUpdateProject}
                    defaultValue={project.Deadline}
                    error={projectUpdateError}
                    setError={setProjectUpdateError}
                  >
                    <MdDriveFileRenameOutline
                      size={24}
                      className="text-slate-800 inline ml-2"
                    />
                  </ModalModifyProject>
                </p>
              </h4>
            </div>
            <div className="md:w-3/5 w-5/5 flex flex-col justify-start gap-2 max-h-[220px]">
              <h3 className="text-lg font-bold text-slate-700 tracking-wide leading-relaxed flex justify-between items-center">
                <p>Description: </p>
                <ModalModifyProject
                  title={"Change your description: "}
                  name={"Description"}
                  func={handelUpdateProject}
                  defaultValue={project.Description}
                  error={projectUpdateError}
                  setError={setProjectUpdateError}
                >
                  <MdDriveFileRenameOutline
                    size={24}
                    className="text-slate-800 inline ml-2"
                  />
                </ModalModifyProject>
              </h3>
              <p className="font-semibold text-md text-gray-600 tracking-wide leading-relaxed">
                {project.Description}
              </p>
            </div>
          </div>
          <Tasks id={id} updateFlag={updateFlag} />
        </div>
      ) : (
        <div className="w-full flex justify-center text-center pt-72 items-center gap-6">
          {error ? (
            <p className="font-bold text-2xl text-slate-500 text-center">
              File failed to load
            </p>
          ) : (
            <ClipLoader className="text-center" color="#ff6300" size={150} />
          )}
        </div>
      )}
    </>
  );
};

export default Project;
