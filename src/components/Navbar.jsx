import { BiTask } from "react-icons/bi";
import { SiTask } from "react-icons/si";
import { GoProjectSymlink } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router";

const Navbar = ({ navbarActive }) => {
  return (
    <div
      className={`w-full bg-white top-18 md:w-[300px] left-0 md:h-full shadow-xl slide-right px-10 py-6 pb-10 transition-all duration-300 ease-in-out ${
        navbarActive ? "fixed md:top-0 top-18" : "hidden"
      } z-50`} // Zwiększony z-index, aby navbar był na pierwszym planie
    >
      <div className="text-slate-800 flex items-center gap-1 mb-10">
        <SiTask size={70} />
        <h1 className="font-bold text-xl">TaskManager</h1>
      </div>

      <div className="flex flex-col gap-4">
        <p className="flex items-center gap-2 text-lg cursor-pointer text-slate-700 font-semibold">
          <BiTask className="text-blue-500" size={32} />
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
          >
            <span>Tasks</span>
          </NavLink>
        </p>
        <p className="flex items-center gap-2 text-lg cursor-pointer text-slate-700 font-semibold">
          <GoProjectSymlink className="text-orange-500" size={32} />
          <NavLink
            to="/project/all"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
          >
            <span>Projects</span>
          </NavLink>
        </p>
        <p className="flex items-center gap-2 text-lg cursor-pointer text-slate-700 font-semibold">
          <FaRegCalendarAlt className="text-purple-500" size={32} />
          <NavLink
            to="/upcoming"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
          >
            <span>Upcoming</span>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
