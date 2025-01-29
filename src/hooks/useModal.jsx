import { useState } from "react";
import { useNavbarActive } from "../store/useNavbarActive";

const useModal = () => {
  const { closeNavbar } = useNavbarActive();
  const [open, setOpen] = useState();

  const openModal = () => {
    closeNavbar(false);

    setTimeout(() => {
      setOpen(true);
    }, 0);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return { open, openModal, closeModal };
};

export default useModal;
