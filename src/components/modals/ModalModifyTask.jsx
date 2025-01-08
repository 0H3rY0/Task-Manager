import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const ModalModifyTask = ({ children, value, index, modifyTask }) => {
  const [newItem, setNewItem] = useState(value);
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay">
          <Dialog.Content className="modal-content">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <Dialog.Title className="font-bold text-2xl">
                  Modify Task
                </Dialog.Title>
                <Dialog.Close>
                  <MdClose size={32} />
                </Dialog.Close>
              </div>
              <div>
                <h3 className="font-semibold text-[15px] text-slate-500 mb-1">
                  Change your task message
                </h3>
                <input
                  type="text"
                  defaultValue={value}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="classicInput px-1"
                />
              </div>
              <div className="flex justify-end items-center">
                <button
                  onClick={() => {
                    modifyTask(index, newItem);
                    setOpen(false);
                  }}
                  className="btn-red "
                >
                  Confirm
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalModifyTask;
