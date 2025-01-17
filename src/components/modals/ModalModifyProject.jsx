import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const ModalModifyProject = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
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
              <input
                type="text"
                className="classicInput ml-[-5px]"
                placeholder="Write here"
              />
            </p>
            <div className="flex justify-end items-center">
              <button className="btn-red">Confirm</button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalModifyProject;
