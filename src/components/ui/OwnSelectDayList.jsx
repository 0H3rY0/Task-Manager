import { useEffect, useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

const OwnSelectDayList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("My week");
  const selectRef = useRef(null);

  const handleSelectOption = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <p className="flex relative justify-center items-center gap-1 font-semibold text-slate-800 px-6 py-1 border-r-2 border-gray-400 cursor-pointer">
      <div className="relative w-40" ref={selectRef}>
        <div
          className="block w-full border-none px-2 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-md flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-semibold text-slate-800 text-md">
            {selectedOption}
          </span>
          <IoIosArrowDown size={20} />
        </div>

        {isOpen && (
          <div className="absolute z-50 left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
            <ul className="space-y-2">
              <li
                onClick={() => handleSelectOption("My week")}
                className="py-2 px-4 cursor-pointer hover:bg-blue-500 hover:text-white"
              >
                My week
              </li>
              <li
                onClick={() => handleSelectOption("My month")}
                className="py-2 px-4 cursor-pointer hover:bg-blue-500 hover:text-white"
              >
                My month
              </li>
              <li
                onClick={() => handleSelectOption("My year")}
                className="py-2 px-4 cursor-pointer hover:bg-blue-500 hover:text-white"
              >
                My year
              </li>
            </ul>
          </div>
        )}
      </div>
    </p>
  );
};

export default OwnSelectDayList;
