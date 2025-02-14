import { TbArticle } from "react-icons/tb";
import { useState } from "react";
import HomeCard from "./ui/HomeCard";
import LeftSwitchButton from "./ui/LeftSwitchButton";
import RightSwitchButton from "./ui/RightSwitchButton";

import { useQuery, gql } from "@apollo/client";

const GET_NEWS_ARTICLES = gql`
  query {
    allNewsarticles {
      id
      title
      description
      fulldescription
      image {
        url
      }
    }
  }
`;

const HomeNewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { data } = useQuery(GET_NEWS_ARTICLES);

  return (
    <>
      <div className="mt-10">
        {/* News section description */}
        <h2 className="font-semibold text-2xl mb-5 text-slate-800 flex items-center gap-2">
          News <TbArticle />
        </h2>
        {/* cart Container */}
        <div className="flex md:flex-row flex-col items-center justify-center gap-10">
          {data ? (
            data.allNewsarticles.map((card, index) => (
              <HomeCard
                key={card.id}
                card={card}
                index={index}
                activeIndex={activeIndex}
              />
            ))
          ) : (
            <p className="text-gray-500 text-lg">No news available</p>
          )}
        </div>

        {/* buttons */}
        {data && (
          <div className=" items-center justify-center mt-5 gap-4 lg:flex hidden">
            <LeftSwitchButton
              setActiveIndex={setActiveIndex}
              cards={data.allNewsarticles}
            />
            <RightSwitchButton
              setActiveIndex={setActiveIndex}
              cards={data.allNewsarticles}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeNewsSection;
