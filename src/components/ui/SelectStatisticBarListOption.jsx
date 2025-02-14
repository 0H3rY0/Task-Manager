const SelectStatisticBarListOption = ({ onClick, text, numberOfDays }) => {
  return (
    <li
      onClick={() => onClick("My " + text, numberOfDays)}
      className="py-2 px-4 cursor-pointer hover:bg-blue-500 hover:text-white"
    >
      {`My ${text}`}
    </li>
  );
};

export default SelectStatisticBarListOption;
