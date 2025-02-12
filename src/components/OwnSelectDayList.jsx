import SelectStatisticBarListOption from "./ui/SelectStatisticBarListOption";
import SelectStatisticsBarListText from "./ui/SelectStatisticsBarListText";
import useSelect from "../hooks/useSelect";

const OwnSelectDayList = ({ handleStatsUpdate }) => {
  const { isOpen, setIsOpen, selectRef, selectedOption, handleSelectOption } =
    useSelect(handleStatsUpdate);

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
