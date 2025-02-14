import { MdOutlinePending } from "react-icons/md";

const CreatedProjects = ({ dependProjects }) => {
  return (
    <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 ">
      <span className="font-bold text-2xl flex justify-center items-center gap-1">
        <MdOutlinePending size={30} /> {dependProjects.length}
      </span>
      Created projects
    </p>
  );
};

export default CreatedProjects;
