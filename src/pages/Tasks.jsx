import { CgGoogleTasks } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { useRef, useState } from "react";

const Tasks = () => {
  const inputRef = useRef(null);

  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
        Tasks <CgGoogleTasks className="text-blue-500" size={32} />
      </h2>
      <div className="flex gap-3">
        <IoMdAdd size={32} className="text-red-500" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Add task"
          className="w-full px-3 rounded-full focus:border-white focus:ring-2 focus:ring-red-300 focus:outline-none transition"
        />
      </div>
    </div>
  );
};

export default Tasks;
