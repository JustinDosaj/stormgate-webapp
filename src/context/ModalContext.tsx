// context/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalStatus = 'info' | 'error' | 'success' | 'warning' | 'auth' | 'delete' | 'report';

interface ModalContextProps {
  isOpen: boolean;
  title: string;
  text: string;
  buttonName: string;
  displayAd: boolean;
  status: ModalStatus;
  buildId?: string;
  slug?: string;
  userId?: string;
  openModal: (title: string, text: string, buttonName: string, status: ModalStatus, displayAd?: boolean, buildId?: number, slug?: string, userId?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [buttonName, setButtonName] = useState('');
  const [ buildId, setBuildId] = useState('');
  const [ slug, setSlug] = useState('');
  const [displayAd, setDisplayAd] = useState(false);
  const [status, setStatus] = useState<ModalStatus>('info');
  const [userId, setUserId] = useState('');

  const openModal = ( title: string, text: string, buttonName: string, status: ModalStatus, displayAd = false, buildId = 0, slug = '', userId = '' ) => {
    setTitle(title);
    setText(text);
    setButtonName(buttonName);
    setStatus(status);
    setDisplayAd(displayAd);
    setBuildId(buildId.toString());
    setSlug(slug);
    setUserId(userId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, title, text, buttonName, displayAd, status, buildId, slug, userId, openModal, closeModal }}>
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
