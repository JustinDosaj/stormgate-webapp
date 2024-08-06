// context/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalStatus = 'info' | 'error' | 'success' | 'warning' | 'auth';

interface ModalContextProps {
  isOpen: boolean;
  title: string;
  text: string;
  buttonName: string;
  displayAd: boolean;
  status: ModalStatus;
  id?: number;
  slug?: string;
  openModal: (title: string, text: string, buttonName: string, status: ModalStatus, displayAd?: boolean, id?: number, slug?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [buttonName, setButtonName] = useState('');
  const [ id, setId] = useState(0);
  const [ slug, setSlug] = useState('');
  const [displayAd, setDisplayAd] = useState(false);
  const [status, setStatus] = useState<ModalStatus>('info');

  const openModal = ( title: string, text: string, buttonName: string, status: ModalStatus, displayAd = false, id = 0, slug = '' ) => {
    setTitle(title);
    setText(text);
    setButtonName(buttonName);
    setStatus(status);
    setDisplayAd(displayAd);
    setId(id);
    setSlug(slug);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, title, text, buttonName, displayAd, status, id, slug, openModal, closeModal }}>
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
