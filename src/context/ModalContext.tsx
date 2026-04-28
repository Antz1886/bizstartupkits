import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isOpen: boolean;
  type: string;
  openModal: (type: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState({ open: false, type: '' });
  
  const openModal = (type: string) => setModal({ open: true, type });
  const closeModal = () => setModal({ open: false, type: '' });

  return (
    <ModalContext.Provider value={{ isOpen: modal.open, type: modal.type, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
};
