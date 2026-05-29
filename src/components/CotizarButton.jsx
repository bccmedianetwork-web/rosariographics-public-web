"use client";

import { useModal } from "./ModalContext";

export default function CotizarButton({ children, className }) {
  const { openModal } = useModal();

  return (
    <button onClick={openModal} className={className}>
      {children}
    </button>
  );
}
