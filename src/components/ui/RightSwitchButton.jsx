import { FaArrowRight } from "react-icons/fa";

const RightSwitchButton = ({ setActiveIndex, cards = [] }) => {
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <button
      onClick={handleNext}
      className="bg-gray-200 opacity-80 text-slate-800 rounded-full p-2 btn hover:bg-gray-400 cursor-pointer"
    >
      <FaArrowRight size={50} />
    </button>
  );
};

export default RightSwitchButton;
