import { RxHamburgerMenu } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineInfo } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { NavLink } from "react-router";
import PropTypes from "prop-types";
import profile from "../../assets/images/profile.jpg";
// import profile from "assets/images/profile.jpg";

function Header({ setNavbarActive, navbarActive }) {
  return (
    <header
      className={
        `py-2 sm:py-4  px-3 sm:px-6 bg-red-500 
    flex justify-between sticky top-0 z-50 ` +
        `${
          navbarActive
            ? "md:ml-[300px] headerAnimation"
            : "w-full headerAnimation"
        }`
      }
    >
      <div className="flex gap-1 sm:gap-4 items-center text-white">
        <RxHamburgerMenu
          onClick={() => setNavbarActive((curr) => !curr)}
          className={
            `p-1 hover:bg-white hover:bg-opacity-45 hover:rounded-sm ` +
            `${
              navbarActive &&
              "bg-white bg-opacity-45 rounded-sm hover:bg-opacity-60"
            }`
          }
          size={34}
        />
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-white bg-opacity-45 rounded-sm"
              : "hover:bg-white hover:bg-opacity-45 hover:rounded-sm"
          }
        >
          <IoHomeOutline size={35} title="add task" className="p-1" />
        </NavLink>
        <div className="text-white bg-white bg-opacity-45 flex items-center px-2 py-1 rounded-full">
          <IoSearchOutline size={26} />
          <input
            className="w-20 sm:w-[200px] bg-transparent text-white border-none focus:outline-none 
            placeholder:text-white ml-2"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex items-center text-white gap-2 sm:gap-5">
        <NavLink
          to="/project/create"
          className={({ isActive }) =>
            isActive
              ? "bg-white bg-opacity-45 rounded-sm"
              : "hover:bg-white hover:bg-opacity-45 hover:rounded-sm"
          }
        >
          <IoMdAdd size={35} title="add task" className="p-1" />
        </NavLink>

        <MdOutlineInfo
          size={35}
          title="show information"
          className="p-1 hover:bg-white hover:bg-opacity-45 hover:rounded-sm"
        />
        <FaRegBell
          size={31}
          title="notifications"
          className="p-1 hover:bg-white hover:bg-opacity-45 hover:rounded-sm"
        />
        <img src={profile} className="w-8 h-8 rounded-full" title="profile" />
      </div>
    </header>
  );
}

Header.propTypes = {
  navbarActive: PropTypes.bool.isRequired, // Prop is required, must be boolean
  setNavbarActive: PropTypes.func.isRequired, // Prop is required, must be a function
};

export default Header;
