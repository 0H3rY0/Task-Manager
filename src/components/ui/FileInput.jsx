import { useRef } from "react";

const FileInput = ({
  name,
  description,
  onClick = "",
  onChange,
  type = "text",
  errors = "",
  defaultValue = "",
}) => {
  // Tworzymy referencję do ukrytego inputa typu file
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programowo wywołujemy kliknięcie na ukrytym input
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
        onClick={onClick}
        onChange={onChange}
        ref={type === "file" ? fileInputRef : null}
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
