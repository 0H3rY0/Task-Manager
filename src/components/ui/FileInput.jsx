import { useRef } from "react";

const FileInput = ({
  name,
  description,
  onClick = null,
  onChange,
  type = "text",
  errors = "",
  defaultValue = "",
}) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <label htmlFor={name} className="font-bold text-lg text-slate-700 ml-1">
        {description}
      </label>
      <input
        name={name}
        id={name}
        onClick={onClick || null}
        onChange={onChange}
        ref={type === "file" ? fileInputRef : null}
        type={type}
        className={`classicInput text-slate-400 ${errors ? "mb-0" : "mb-3"} ${
          type === "file" && "hidden"
        }`}
        placeholder="You can type here"
        defaultValue={defaultValue}
      />
      {errors && (
        <p className="text-md font-normal text-red-400 ml-1 mb-3">{errors}</p>
      )}
      {type === "file" && (
        <button
          type="button"
          onClick={handleButtonClick}
          className="btn-gray block"
        >
          Pick image
        </button>
      )}
    </>
  );
};

export default FileInput;
