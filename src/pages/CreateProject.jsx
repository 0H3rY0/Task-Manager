import { MdOutlineCreateNewFolder } from "react-icons/md";
import { NavLink } from "react-router";
import AddProjectForm from "../components/ui/AddProjectForm";

const CreateProject = () => {
  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
          Projects{" "}
          <MdOutlineCreateNewFolder className="text-orange-500" size={26} />
        </h2>
        <NavLink to="/project/all">
          <button className="btn-gray flex items-center gap-2">
            Back to Projects
          </button>
        </NavLink>
      </div>
      <div>
        <AddProjectForm />
      </div>
    </div>
  );
};

export default CreateProject;
