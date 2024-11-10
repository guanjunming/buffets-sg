import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import RestaurantDetails from "./components/home/RestaurantDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginModal from "./components/login/LoginModal";
import SignupModal from "./components/login/SignupModal";
import { ModalProvider } from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          </Routes>

          <Footer />

          <LoginModal />
          <SignupModal />
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
