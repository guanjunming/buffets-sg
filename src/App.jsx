import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";
import { createContext, useState } from "react";

const queryClient = new QueryClient();

export const ModalContext = createContext();

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  // Functions to open modals
  const openLoginModal = () => setLoginOpen(true);
  const openSignupModal = () => setSignupOpen(true);
  const closeLoginModal = () => setLoginOpen(false);
  const closeSignupModal = () => setSignupOpen(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ openLoginModal, openSignupModal }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />

        <LoginModal open={isLoginOpen} onClose={closeLoginModal} />
        {/* <SignupModal open={isSignupOpen} onClose={closeSignupModal} /> */}
      </ModalContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
