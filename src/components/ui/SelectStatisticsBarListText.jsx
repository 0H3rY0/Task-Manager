import { IoIosArrowDown } from "react-icons/io";

const SelectStatisticsBarListText = ({ setIsOpen, isOpen, selectedOption }) => {
  return (
    <div
      className=" w-full border-none px-2 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-md flex items-center justify-center gap-2 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="font-semibold text-slate-800 text-md">
        {selectedOption}
      </span>
      <IoIosArrowDown size={20} />
    </div>
  );
};

export default SelectStatisticsBarListText;
