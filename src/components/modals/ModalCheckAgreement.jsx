import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { useNavbarActive } from "../../store/useNavbarActive";
import useModal from "../../hooks/useModal";

const ModalCheckAgreement = ({
  children,
  func,
  funcParam,
  funcParam2,
  titleText,
  btnText = "Confirm",
}) => {
  const { open, openModal, closeModal } = useModal();

  return (
    <Dialog.Root open={open} onOpenChange={closeModal}>
      <Dialog.Trigger asChild>
        <span onClick={openModal} className="cursor-pointer">
          {children}
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay">
          <Dialog.Content className="modal-content">
            <div className="flex justify-between items-center text-2xl font-bold">
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
  funcParam: PropTypes.any, // Param for func
  funcParam2: PropTypes.any, // Param for func
};

export default ModalCheckAgreement;
