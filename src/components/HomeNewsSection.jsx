import { TbArticle } from "react-icons/tb";
import profile from "../../src/assets/images/profile.jpg";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const HomeNewsSection = () => {
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
    <>
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
    </>
  );
};

export default HomeNewsSection;
