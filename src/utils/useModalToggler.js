import { useState } from "react";

export default function useModalToggler() {
  const [showModal, setShowModal] = useState(false);

  const modalToggler = () => {
    setShowModal((showModal) => !showModal);
  };

  return { showModal, modalToggler };
}
