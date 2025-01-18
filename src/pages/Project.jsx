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

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [error, setError] = useState(false);
  const [projectUpdateError, setProjectUpdateError] = useState({ Title: "" });
  const navigate = useNavigate();

  const { handleFileUpload, UploadImageError, animationClass } =
    useFileUpload();

  useEffect(() => {
    const getProject = async () => {
      try {
        const data = await ProjectService.getProject(id);
        setProject(data);
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
    console.log("stary: " + project.Title);
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
      setProjectUpdateError({ Title: "" });
    } catch (error) {
      const firstError = error.inner?.[0]?.message || "Validation failed";
      setProjectUpdateError((prev) => ({
        ...prev,
        [name]: firstError,
      }));
    }
  };

  return (
    <>
      {project.Title ? (
        <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
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
                <Dialog.Trigger>
                  <div className="btn-red flex items-center gap-2">
                    <RiDeleteBack2Fill size={20} /> Delete Project
                  </div>
                </Dialog.Trigger>
              </ModalCheckAgreement>
            </div>
          </div>
          <div className="flex w-full gap-10 ">
            <div className="w-2/5 flex flex-col items-start gap-3">
              <div
                className="relative min-h-[250px] w-full p-4 border-2 rounded-lg 
  border-orange-200 flex items-center justify-center group bg-white z-0"
              >
                {project.ImageUrl ? (
                  <img
                    src={project.ImageUrl}
                    alt=""
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <SiTask size={150} className="text-orange-500" />
                )}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center 
    opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                >
                  <span className="text-white text-lg font-semibold cursor-pointer">
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={(e) => handleUpdateProjectImage(e)}
                    />
                    <label htmlFor="fileInput">Change image</label>
                  </span>
                </div>
              </div>
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
                  <Dialog.Trigger>
                    <MdDriveFileRenameOutline
                      size={30}
                      className="text-slate-800 inline ml-2"
                    />
                  </Dialog.Trigger>
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
                  >
                    <Dialog.Trigger>
                      <MdDriveFileRenameOutline
                        size={24}
                        className="text-slate-800 inline ml-2"
                      />
                    </Dialog.Trigger>
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
                  >
                    <Dialog.Trigger>
                      <MdDriveFileRenameOutline
                        size={24}
                        className="text-slate-800 inline ml-2"
                      />
                    </Dialog.Trigger>
                  </ModalModifyProject>
                </p>
              </h4>
            </div>
            <div className="w-3/5 flex flex-col justify-start gap-2">
              <h3 className="text-lg font-bold text-slate-700 tracking-wide leading-relaxed flex justify-between items-center">
                <p>Description: </p>
                <ModalModifyProject
                  title={"Change your description: "}
                  name={"Description"}
                  func={handelUpdateProject}
                  defaultValue={project.Description}
                >
                  <Dialog.Trigger>
                    <MdDriveFileRenameOutline
                      size={24}
                      className="text-slate-800 inline ml-2"
                    />
                  </Dialog.Trigger>
                </ModalModifyProject>
              </h3>
              <p className="font-semibold text-md text-gray-600 tracking-wide leading-relaxed">
                {project.Description}
              </p>
            </div>
          </div>
          <Tasks id={id} />
        </div>
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
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
