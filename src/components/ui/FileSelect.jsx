const SelectImportance = ({
  // value,
  onChange,
  options = ["Low", "Medium", "High"],
  name = "Importance",
  defaultValue = "Low",
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="Importance"
        className="font-bold text-lg text-slate-700 ml-1"
      >
        Priority
      </label>
      <select
        className="block text-slate-400"
        name={name}
        // value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectImportance;
