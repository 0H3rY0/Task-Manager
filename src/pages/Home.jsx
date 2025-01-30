import { IoCheckmarkSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { TbArticle } from "react-icons/tb";
import profile from "../../src/assets/images/profile.jpg";

const Home = () => {
  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start md:gap-0 gap-2">
        <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
          Home <FaHome className="text-blue-500" size={26} />
        </h2>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <span className="text-slate-800 text-lg">Wednesday, May 24</span>
        <p className="text-slate-800 text-4xl font-semibold">Hello, John</p>

        <div className="flex px-5 py-4 shadow-xl rounded-full bg-gray-200">
          <p className="flex justify-center items-center gap-1 font-semibold text-slate-800 px-6 py-1 border-r-2 border-gray-400 cursor-pointer">
            My week
            <span>
              <IoIosArrowDown size={20} />
            </span>
          </p>
          <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 border-r-2 border-gray-400">
            <span className="font-bold text-2xl flex justify-center items-center gap-1">
              <IoCheckmarkSharp size={30} /> 0
            </span>{" "}
            Tasks completed
          </p>
          <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 ">
            <span className="font-bold text-2xl flex justify-center items-center gap-1">
              <MdOutlinePending size={30} /> 1
            </span>{" "}
            pending projects
          </p>
        </div>
      </div>

      {/* news section  */}
      <div className="mt-10">
        <h2 className="font-semibold text-2xl mb-5 text-slate-800 flex items-center gap-2">
          News <TbArticle />{" "}
        </h2>
        {/* cart Container */}
        <div className="flex items-center justify-center gap-10">
          <div className="w-2/5 flex flex-col border-2 border-gray-300 rounded-md shadow-xl h-80">
            <div className="h-1/2">
              <img
                className="w-full h-full object-cover rounded-t-md"
                src={profile}
                alt="Profile"
              />
            </div>

            <div className="h-1/2 flex flex-col justify-center items-center text-slate-700 p-2">
              <p className="font-semibold text-lg">Study quickly</p>
              <p className="text-md text-center">
                Build your short-termm memory
              </p>
            </div>
          </div>
          <div className="w-2/5 flex flex-col border-2 border-gray-300 rounded-md shadow-xl h-80">
            <div className="h-1/2">
              <img
                className="w-full h-full object-cover rounded-t-md"
                src={profile}
                alt="Profile"
              />
            </div>

            <div className="h-1/2 flex flex-col justify-center items-center text-slate-700 p-2">
              <p className="font-semibold text-lg">Study quickly</p>
              <p className="text-md text-center">
                Build your short-termm memory
              </p>
            </div>
          </div>
          <div className="w-2/5 flex flex-col border-2 border-gray-300 rounded-md shadow-xl h-80">
            <div className="h-1/2">
              <img
                className="w-full h-full object-cover rounded-t-md"
                src={profile}
                alt="Profile"
              />
            </div>

            <div className="h-1/2 flex flex-col justify-center items-center text-slate-700 p-2">
              <p className="font-semibold text-lg">Study quickly</p>
              <p className="text-md text-center">
                Build your short-termm memory
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
