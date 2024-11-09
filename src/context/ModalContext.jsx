import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  const openLoginModal = () => {
    if (isSignupOpen) {
      setSignupOpen(false);
    }
    setLoginOpen(true);
  };

  const closeLoginModal = () => {
    setLoginOpen(false);
  };

  const openSignupModal = () => {
    if (isLoginOpen) {
      setLoginOpen(false);
    }
    setSignupOpen(true);
  };

  const closeSignupModal = () => {
    setSignupOpen(false);
  };

  const value = {
    isLoginOpen,
    isSignupOpen,
    openLoginModal,
    closeLoginModal,
    openSignupModal,
    closeSignupModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
