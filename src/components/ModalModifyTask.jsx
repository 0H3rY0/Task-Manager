import * as Dialog from "@radix-ui/react-dialog";
import { MdClose } from "react-icons/md";

const ModalModifyTask = ({ children, value }) => {
  return (
    <Dialog.Root>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50">
          <Dialog.Content
            className="fixed left-1/2 top-1/2 -translate-x-1/2
           -translate-y-1/2 w-full max-w-md rounded-md bg-white p-8 text-gray-900 shadow
           "
          >
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
                  value={value}
                  className="w-full px-1 rounded-full focus:border-white focus:ring-2 focus:ring-red-300 focus:outline-none transition"
                />
              </div>
              <div className="flex justify-end items-center">
                <button
                  className="font-bold bg-red-500 rounded py-2 px-3
                 hover:bg-red-400 text-slate-800 hover:text-slate-600 "
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
