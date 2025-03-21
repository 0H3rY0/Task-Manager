import { RxHamburgerMenu } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
// import profile from "../../assets/images/profile.jpg";
import userProfile from "../../assets/images/userProfile.webp";
import { MdOutlineLogout } from "react-icons/md";
import ModalCheckAgreement from "../modals/ModalCheckAgreement";
import { useAuthStore } from "../../store/useAuthStore";
import { IoEyeOutline } from "react-icons/io5";
import { useNavbarActive } from "../../store/useNavbarActive";
import { useUserStore } from "../../store/useUserStore";

function Header() {
  const { isAuthenticated, logout, setAccessFull } = useAuthStore();
  const { isNavbarActive, setIsNavbarActive } = useNavbarActive();
  const { user } = useUserStore();

  const navigate = useNavigate();

  return (
    <header
      className={
        `py-2 sm:py-4  px-3 sm:px-6 bg-red-500 
    flex justify-between sticky top-0 z-50 ` +
        `${
          isNavbarActive
            ? "md:ml-[300px] headerAnimation"
            : "w-full headerAnimation"
        }`
      }
    >
      <div className="flex gap-1 sm:gap-4 items-center text-white">
        <RxHamburgerMenu
          onClick={() => setIsNavbarActive((curr) => !curr)}
          className={
            `p-1 hover:bg-white hover:bg-opacity-45 hover:rounded-sm ` +
            `${
              isNavbarActive &&
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

        {isAuthenticated ? (
          <ModalCheckAgreement
            titleText={"Are you sure you want to logout"}
            btnText={"Logout"}
            func={logout}
          >
            <MdOutlineLogout
              size={35}
              title="logout"
              className="p-1 hover:bg-white hover:bg-opacity-45 hover:rounded-sm"
            />
          </ModalCheckAgreement>
        ) : (
          <IoEyeOutline
            size={35}
            title="login"
            className="p-1 hover:bg-white hover:bg-opacity-45 hover:rounded-sm"
            onClick={setAccessFull}
          />
        )}

        <FaRegBell
          size={31}
          title="notifications"
          className="p-1 hover:bg-white hover:bg-opacity-45 hover:rounded-sm"
        />
        <img
          src={user.imageUrl ? user.imageUrl : userProfile}
          className="w-8 h-8 object-cover rounded-full border-2 border-gray-300 shadow-md"
          title="profile"
          onClick={() => navigate("/user-settings")}
        />
      </div>
    </header>
  );
}

export default Header;
