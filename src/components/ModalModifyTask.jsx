import * as Dialog from "@radix-ui/react-dialog";

const ModalModifyTask = ({ children }) => {
  return (
    <Dialog.Root>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50">
          <Dialog.Content
            className="fixed left-1/2 top-1/2 -translate-x-1/2
           -translate-y-1/2 w-full max-w-md rounded-md bg-white p-8 text-gray-900 shadow"
          >
            <Dialog.Title>Modify Task</Dialog.Title>
            You can modify now
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalModifyTask;
