import * as Dialog from "@radix-ui/react-dialog";
import FileInput from "../ui/FileInput";
import useModal from "../../hooks/useModal";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ModalConfirmPassowrd = ({ children, id }) => {
  const { open, openModal, closeModal } = useModal();

  const initialPasswordData = {
    currentPassword: "",
    newPassword: "",
    repetedNewPassword: "",
  };
  const [passwordData, setPasswordData] = useState(initialPasswordData);
  const [passwordError, setPasswordError] = useState("");

  const onInputChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setPasswordError(null);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.repetedNewPassword) {
      console.log("New passwords do not match");
      setPasswordError("New password do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          id: id,
        }
      );

      if (response.status === 200) {
        console.log("Password changed successfully:", response.data);
        closeModal(false);
        toast("Password changed successfully!");
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      const newError = error.response?.data.message || error.message;
      console.log(newError);

      setPasswordError(newError);
    }
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
            <div className="flex justify-between items-center text-2xl font-bold">
              <Dialog.Title className="mb-5">Change password: </Dialog.Title>
              <Dialog.Close>
                <MdClose size={32} />
              </Dialog.Close>
            </div>
            <div>
              <FileInput
                description={"Write current password "}
                type="text"
                onChange={onInputChange}
                name={"currentPassword"}
                // errors={errors.deadline}
                placeholder={"current Password"}
              />
              <FileInput
                description={"Write new password "}
                type="text"
                onChange={onInputChange}
                name={"newPassword"}
                // errors={errors.deadline}
              />
              <FileInput
                description={"Repet new passowrd: "}
                type="text"
                onChange={onInputChange}
                name={"repetedNewPassword"}
                // errors={errors.deadline}
              />
              {passwordError && (
                <p className="errorText mb-5">{passwordError}</p>
              )}
            </div>
            <div className="w-full flex justify-end gap-3">
              <Dialog.Close className="btn-gray">Cancel</Dialog.Close>
              <button className="btn-red" onClick={handleChangePassword}>
                Save
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalConfirmPassowrd;
