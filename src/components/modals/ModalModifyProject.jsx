import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const ModalModifyProject = ({
  title,
  children,
  name,
  func,
  defaultValue = "",
  error = false,
  setError,
}) => {
  const [open, setOpen] = useState(false);
  const [newInputValue, setNewInputValue] = useState(defaultValue);
  const [letterCounter, setLetterCounter] = useState(defaultValue.length);

  const updateProject = async () => {
    await func(name, newInputValue, () => {
      if (!error) {
        setOpen(false);
      } else {
        setError(false);
        setOpen(false);
      }
    });
  };

  const count = (e) => {
    const text = e.target.value;
    setLetterCounter(text.length);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setError(false);
        }
      }}
    >
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay">
          <Dialog.Content className="modal-content flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
              <Dialog.Close>
                <MdClose size={32} />
              </Dialog.Close>
            </div>

            <p>
              {name === "Title" || name === "Description" ? (
                <input
                  type="text"
                  className="classicInput ml-[-5px]"
                  placeholder="Write here"
                  name={name}
                  defaultValue={defaultValue}
                  onChange={(e) => {
                    setNewInputValue(e.target.value);
                    count(e);
                  }}
                />
              ) : name === "Deadline" ? (
                <input
                  type="date"
                  className="classicInput ml-[-5px]"
                  placeholder="Write here"
                  name={name}
                  defaultValue={defaultValue}
                  onChange={(e) => setNewInputValue(e.target.value)}
                />
              ) : (
                <select
                  className="mt-1 "
                  onChange={(e) => setNewInputValue(e.target.value)}
                  defaultValue={defaultValue}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              )}
            </p>
            <p className="text-md font-normal text-red-400">{error}</p>
            <div
              className={
                `flex justify-end items-center ` +
                `${
                  name === "Title" || name === "Description"
                    ? "justify-between"
                    : ""
                }`
              }
            >
              {name === "Title" || name === "Description" ? (
                <p className="font-semibold border-2 px-4 py-2 border-slate-800 rounded-full ">
                  {letterCounter}/100
                </p>
              ) : (
                ""
              )}
              <button className="btn-red" onClick={() => updateProject()}>
                Confirm
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalModifyProject;
