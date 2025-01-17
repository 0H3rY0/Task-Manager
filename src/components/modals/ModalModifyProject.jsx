import * as Dialog from "@radix-ui/react-dialog";

const ModalModifyProject = ({ title, children }) => {
  return (
    <Dialog.Root>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay">
          <Dialog.Content className="modal-content">
            <Dialog.Title>{title}</Dialog.Title>
            <p>
              <input type="text" className="classicInput" />
            </p>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalModifyProject;
