import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import FileInput from "../ui/FileInput";
import FileSelect from "../ui/FileSelect";
import useModal from "../../hooks/useModal";

const ModalModifyTask = ({
  children,
  task = { id: "", content: "", deadline: "", importance: "" },
  taskId,
  modifyTask,
  modifyTaskErrors = {
    content: "",
    deadline: "",
    importance: "",
  },
}) => {
  const [newTask, setNewTask] = useState(task);
  const { open, openModal, closeModal } = useModal();

  useEffect(() => {
    setNewTask(task);
  }, [task]);

  const onInputChange = (e) => {
    setNewTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
                <FileInput
                  description={"Change message: "}
                  onChange={onInputChange}
                  defaultValue={newTask.content}
                  name={"content"}
                  errors={modifyTaskErrors.content}
                />
                <FileInput
                  description={"Change deadline: "}
                  type="date"
                  onClick={(e) => e.target.showPicker()}
                  onChange={onInputChange}
                  name={"deadline"}
                  errors={modifyTaskErrors.deadline}
                  defaultValue={newTask.deadline}
                />
                <FileSelect
                  onChange={onInputChange}
                  name={"importance"}
                  errors={modifyTaskErrors.importance}
                  defaultValue={newTask.importance}
                />
              </div>
              <div className="flex justify-end items-center">
                <button
                  onClick={() => {
                    modifyTask(taskId, newTask, closeModal);
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

ModalModifyTask.propTypes = {
  children: PropTypes.node.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    importance: PropTypes.string.isRequired,
  }).isRequired,
  taskId: PropTypes.string.isRequired,
  modifyTask: PropTypes.func.isRequired,
  modifyTaskErrors: PropTypes.shape({
    content: PropTypes.string,
    deadline: PropTypes.string,
    importance: PropTypes.string,
  }),
};

export default ModalModifyTask;
