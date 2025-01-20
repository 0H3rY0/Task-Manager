import * as Dialog from "@radix-ui/react-dialog";
import FileInput from "../ui/FileInput";
import FileSelect from "../ui/FileSelect";

const ModalConfigureTask = ({ children }) => {
  return (
    <Dialog.Root>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay">
          <Dialog.Content className="modal-content">
            <Dialog.Title className="text-2xl font-bold mb-5">
              Configure your Task
            </Dialog.Title>
            <div>
              <FileInput
                description={"Choose your deadline: "}
                type="date"
                onClick={(e) => e.target.showPicker()}
              />
              <FileSelect />
            </div>
            <div className="w-full flex justify-end">
              <button className="btn-red">Confirm</button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalConfigureTask;
