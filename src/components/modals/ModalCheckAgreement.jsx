import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";

const ModalCheckAgreement = ({
  children,
  func,
  funcParam,
  funcParam2,
  titleText,
  btnText = "Confirm",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {typeof children === "function" ? children(open) : children}
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
              <h3 className="font-semibold text-slate-600">{titleText}</h3>
            </div>
            <div className="flex gap-5 justify-center mt-4">
              <Dialog.Close className="btn-gray">Cancel</Dialog.Close>
              <button
                onClick={() => {
                  func(funcParam, funcParam2);
                  setOpen(false);
                }}
                className="btn-red"
              >
                {btnText}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

ModalCheckAgreement.propTypes = {
  children: PropTypes.node.isRequired, // Any renderable React content
  titleText: PropTypes.string,
  btnText: PropTypes.string,
  func: PropTypes.func, // Function to remove the task
  index: PropTypes.number, // Index of the task to be deleted
};

export default ModalCheckAgreement;
