import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Footer from "./pages/Footer";
import LoginModal from "./components/login/LoginModal";
import SignupModal from "./components/login/SignupModal";
import { ModalProvider } from "./context/ModalProvider";
import { AuthProvider } from "./context/AuthProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <Navbar />

          <div className="m-auto max-w-screen-xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurant/:id" element={<Detail />} />
              <Route path="/login" element={<Login />} />
            </Routes>

            <Footer />
          </div>

          <LoginModal />
          <SignupModal />
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
