import * as Dialog from "@radix-ui/react-dialog";
import { MdClose } from "react-icons/md";

const ModalDeleteTask = ({ children }) => {
  return (
    <Dialog.Root>
      {children}
      <Dialog.Portal>
        <Dialog.Content>
          <div>
            <Dialog.Title>Alert!</Dialog.Title>
            <Dialog.Close>
              <MdClose size={32} />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalDeleteTask;
