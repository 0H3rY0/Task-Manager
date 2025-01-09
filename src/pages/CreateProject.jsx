import { MdOutlineCreateNewFolder } from "react-icons/md";
import { NavLink } from "react-router";

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
        <form action="">
          <label
            htmlFor="Title"
            className="font-bold text-lg text-slate-700 ml-1"
          >
            Title
          </label>
          <input
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
            type="date"
            className="classicInput mb-3 text-slate-400"
            placeholder="Write a title"
          />

          <label
            htmlFor="Importance"
            className="font-bold text-lg text-slate-700 ml-1"
          >
            Importance
          </label>
          <select className="block text-slate-400">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low" defaultChecked>
              Low
            </option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
