import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const ModalDeleteTask = ({ children, removeTask, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay">
          <Dialog.Content className="modal-content">
            <div
              className="flex justify-between items-center text-2xl font-bold
             "
            >
              <Dialog.Title>Alert!</Dialog.Title>
              <Dialog.Close>
                <MdClose size={32} />
              </Dialog.Close>
            </div>
            <div>
              <h3 className="font-semibold text-slate-600">
                Are you sure you want to delete this task?
              </h3>
            </div>
            <div className="flex gap-5 justify-center mt-4">
              <Dialog.Close
                className="bg-white px-4 py-2 border-2 border-slate-600
              rounded-md text-slate-700 font-bold hover:bg-slate-200 hover:text-slate-600"
              >
                Cancel
              </Dialog.Close>
              <button
                onClick={() => {
                  removeTask(index);
                  setOpen(false);
                }}
                className="font-bold bg-red-500 border-2 border-red-500 rounded py-2 px-4
                 hover:bg-red-400 hover:border-red-400 text-white"
              >
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalDeleteTask;
