import { IoCheckmarkSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { TbArticle } from "react-icons/tb";
import profile from "../../src/assets/images/profile.jpg";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const Home = () => {
  const cards = [
    { id: 1, title: "Card 1", text: "Description 1" },
    { id: 2, title: "Card 2", text: "Description 2" },
    { id: 3, title: "Card 3", text: "Description 3" },
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

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
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`card ${index === activeIndex ? "active" : ""}`}
            >
              <div className="card-image">
                <img src={profile} alt="Card" />
              </div>
              <div className="card-content">
                <p className="card-title">{card.title}</p>
                <p className="card-text">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-5 gap-4">
          <button
            onClick={handlePrev}
            className="bg-gray-200 opacity-80 text-slate-800 rounded-full p-2 btn hover:bg-gray-400 cursor-pointer"
          >
            <FaArrowLeft size={50} />
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-200 opacity-80 text-slate-800 rounded-full p-2 btn hover:bg-gray-400 cursor-pointer"
          >
            <FaArrowRight size={50} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
