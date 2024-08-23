"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface ModalContextType {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  }, [isModalOpen]);

  const closeModal = useCallback(() => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  }, [isModalOpen]);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within an ModalProvider");
  }
  return context;
};
