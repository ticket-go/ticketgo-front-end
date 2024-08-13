"use client";

import { useState } from "react";

export function useMenuUser() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModal = () => setModalOpen((prev) => !prev);

  return {
    isModalOpen,
    handleModal,
  };
}
