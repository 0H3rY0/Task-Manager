import { TbArticle } from "react-icons/tb";
import { useState } from "react";
import HomeCard from "./ui/HomeCard";
import LeftSwitchButton from "./ui/LeftSwitchButton";
import RightSwitchButton from "./ui/RightSwitchButton";

const HomeNewsSection = () => {
  const cards = [
    { id: 1, title: "Card 1", text: "Description 1" },
    { id: 2, title: "Card 2", text: "Description 2" },
    { id: 3, title: "Card 3", text: "Description 3" },
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <>
      <div className="mt-10">
        {/* News section description */}
        <h2 className="font-semibold text-2xl mb-5 text-slate-800 flex items-center gap-2">
          News <TbArticle />{" "}
        </h2>
        {/* cart Container */}
        <div className="flex items-center justify-center gap-10">
          {cards.map((card, index) => (
            <HomeCard
              key={card.id}
              card={card}
              index={index}
              activeIndex={activeIndex}
            />
          ))}
        </div>
        {/* buttons */}
        <div className="flex items-center justify-center mt-5 gap-4">
          <LeftSwitchButton setActiveIndex={setActiveIndex} cards={cards} />
          <RightSwitchButton setActiveIndex={setActiveIndex} cards={cards} />
        </div>
      </div>
    </>
  );
};

export default HomeNewsSection;
