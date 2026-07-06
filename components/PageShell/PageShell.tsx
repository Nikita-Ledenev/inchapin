"use client";

import { useCallback, useState, type ReactNode } from "react";
import CallbackModal from "@/components/CallbackModal/CallbackModal";
import Header from "@/components/Header/Header";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <SmoothScroll>
      <Header onCallbackClick={openModal} />
      <main>{children}</main>
      <CallbackModal isOpen={isModalOpen} onClose={closeModal} />
    </SmoothScroll>
  );
}
