// context/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalStatus = 'info' | 'error' | 'success' | 'warning';

interface ModalContextProps {
  isOpen: boolean;
  title: string;
  text: string;
  buttonName: string;
  role?: string | null;
  displayAd: boolean;
  status: ModalStatus;
  openModal: (title: string, text: string, buttonName: string, status: ModalStatus, displayAd?: boolean, role?: string | null) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [buttonName, setButtonName] = useState('');
  const [role, setRole] = useState<string | null>(null);
  const [displayAd, setDisplayAd] = useState(false);
  const [status, setStatus] = useState<ModalStatus>('info');

  const openModal = (title: string, text: string, buttonName: string, status: ModalStatus, displayAd = false, role: string | null = null) => {
    setTitle(title);
    setText(text);
    setButtonName(buttonName);
    setStatus(status);
    setDisplayAd(displayAd);
    setRole(role);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, title, text, buttonName, role, displayAd, status, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
