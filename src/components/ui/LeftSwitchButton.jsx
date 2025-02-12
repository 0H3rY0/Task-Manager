import { FaArrowLeft } from "react-icons/fa";

const LeftSwitchButton = ({ setActiveIndex, cards = [] }) => {
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <button
      onClick={handlePrev}
      className="bg-gray-200 opacity-80 text-slate-800 rounded-full p-2 btn hover:bg-gray-400 cursor-pointer"
    >
      <FaArrowLeft size={50} />
    </button>
  );
};

export default LeftSwitchButton;
