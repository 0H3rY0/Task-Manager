import { useEffect, useState, useRef } from "react";
// import { IoIosArrowDown } from "react-icons/io";
import SelectStatisticBarListOption from "./ui/SelectStatisticBarListOption";
import SelectStatisticsBarListText from "./ui/SelectStatisticsBarListText";

const OwnSelectDayList = ({ handleStatsUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("My week");
  const selectRef = useRef(null);

  const handleSelectOption = (value, days) => {
    setSelectedOption(value);
    setIsOpen(false);
    handleStatsUpdate(days);
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
    <div
      className="w-full relative md:w-40 font-semibold text-slate-800 md:border-gray-400 md:border-r-2"
      ref={selectRef}
    >
      <SelectStatisticsBarListText
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        selectedOption={selectedOption}
      />

      {isOpen && (
        <div className="absolute z-50 left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="space-y-2">
            <SelectStatisticBarListOption
              onClick={handleSelectOption}
              text="week"
              numberOfDays={7}
            />
            <SelectStatisticBarListOption
              onClick={handleSelectOption}
              text="month"
              numberOfDays={30}
            />
            <SelectStatisticBarListOption
              onClick={handleSelectOption}
              text="year"
              numberOfDays={365}
            />
          </ul>
        </div>
      )}
    </div>
  );
};

export default OwnSelectDayList;
