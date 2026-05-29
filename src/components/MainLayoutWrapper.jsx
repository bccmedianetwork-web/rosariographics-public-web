"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TrackingProvider from "./TrackingProvider";
import { ModalContext } from "./ModalContext";

const ContactModal = dynamic(() => import("./ContactModal"), { ssr: false });

export default function MainLayoutWrapper({ children }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <ModalContext.Provider value={{ openModal }}>
      <TrackingProvider>
        <Navbar onOpenModal={openModal} />
        {children}
        <Footer />
        <ContactModal isOpen={modalOpen} onClose={closeModal} />
      </TrackingProvider>
    </ModalContext.Provider>
  );
}
