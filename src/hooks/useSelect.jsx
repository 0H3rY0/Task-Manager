import { useRef, useState, useEffect } from "react";

const useSelect = (callback) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("My week");
  const selectRef = useRef(null);

  const handleSelectOption = (value, argument) => {
    setSelectedOption(value);
    setIsOpen(false);
    callback(argument);
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

  return { isOpen, setIsOpen, selectRef, selectedOption, handleSelectOption };
};

export default useSelect;
