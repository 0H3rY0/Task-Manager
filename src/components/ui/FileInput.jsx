const FileInput = ({
  name,
  description,
  onChange,
  type = "text",
  onClick,
  errors = "",
  defaultValue = "",
}) => {
  return (
    <>
      <label htmlFor={name} className="font-bold text-lg text-slate-700 ml-1">
        {description}
      </label>
      <input
        name={name}
        id={name}
        onChange={onChange}
        {...(onClick !== "" ? (onClick = { onClick }) : "")}
        type={type}
        className={`classicInput ${errors ? "mb-0" : "mb-3"} ${
          type === "file" && "hidden"
        }`}
        placeholder="Write a Description"
        defaultValue={defaultValue}
      />
      {errors && (
        <p className="text-md font-normal text-red-400 ml-1 mb-3">{errors}</p>
      )}
      {type === "file" && (
        <button htmlFor={name} className="btn-gray block">
          pick image
        </button>
      )}
    </>
  );
};

export default FileInput;
