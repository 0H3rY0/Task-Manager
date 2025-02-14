import { IoCheckmarkSharp } from "react-icons/io5";

const CompletedTasks = ({ dependTasks }) => {
  return (
    <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 md:border-r-2 md:border-gray-400">
      <span className="font-bold text-2xl flex justify-center items-center gap-1">
        <IoCheckmarkSharp size={30} /> {dependTasks.length}
      </span>
      Tasks completed
    </p>
  );
};

export default CompletedTasks;
