import { BiTask } from "react-icons/bi";
import { SiTask } from "react-icons/si";
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useNavbarActive } from "../../store/useNavbarActive";

const Navbar = ({ navbarActive }) => {
  const { closeNavbar } = useNavbarActive();

  return (
    <div
      className={`w-full z-50 bg-white top-18 md:w-[300px] left-0 md:h-full shadow-xl slide-right px-10 py-6 pb-10 transition-all duration-300 ease-in-out ${
        navbarActive ? "fixed md:top-0 top-18" : "hidden"
      } z-50`}
    >
      <div className="text-slate-800 flex items-center gap-1 mb-10">
        <SiTask size={70} />
        <h1 className="font-bold text-xl">TaskManager</h1>
      </div>

      <div className="flex flex-col gap-4">
        <p className="flex items-center gap-2 text-lg cursor-pointer text-slate-700 font-semibold">
          <FaHome className="text-blue-500" size={32} />
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-red-500" : "")}
          >
            <span>Home</span>
          </NavLink>
        </p>
        <p className="flex items-center gap-2 text-lg cursor-pointer text-slate-700 font-semibold">
          <BiTask className="text-orange-500" size={32} />
          <NavLink
            to="/project/all"
            className={({ isActive }) => (isActive ? "text-red-500" : "")}
          >
            <span>Projects</span>
          </NavLink>
        </p>
        <p className="flex items-center gap-2 text-lg cursor-pointer text-slate-700 font-semibold">
          <MdOutlineCreateNewFolder className="text-orange-500" size={32} />
          <NavLink
            to="/project/create"
            className={({ isActive }) => (isActive ? "text-red-500" : "")}
          >
            <span>Create Project</span>
          </NavLink>
        </p>
        <p className="flex items-center gap-2 text-lg cursor-pointer text-slate-700 font-semibold">
          <FaRegCalendarAlt className="text-purple-500" size={32} />
          <NavLink
            to="/upcoming"
            className={({ isActive }) => (isActive ? "text-red-500" : "")}
          >
            <span>Upcoming</span>
          </NavLink>
        </p>
        <p className="flex items-center gap-2 text-lg cursor-pointer text-slate-700 font-semibold">
          <FaRegUser className="text-green-500" size={32} />

          <NavLink
            to="/user-settings"
            className={({ isActive }) => (isActive ? "text-red-500" : "")}
          >
            <span>User setting</span>
          </NavLink>
        </p>
        <p className="flex items-center gap-2 text-lg cursor-pointer text-slate-700 font-semibold mt-5"></p>
      </div>

      {navbarActive && (
        <div
          className="md:hidden block z-40 fixed top-[30rem] left-0 w-full h-full"
          onClick={() => closeNavbar(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
