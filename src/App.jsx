import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Footer from "./pages/Footer";
import ProtectedRoute from "./pages/ProtectedRoute";
import LoginModal from "./components/login/LoginModal";
import SignupModal from "./components/login/SignupModal";
import { ModalProvider } from "./context/ModalProvider";
import { AuthProvider } from "./context/AuthProvider";
import ScrollToTop from "./components/common/ScrollToTop";
import { FavouritesProvider } from "./context/FavouritesProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <FavouritesProvider>
            <div className="min-h-screen">
              <Navbar />

              <ScrollToTop />
              <div className="m-auto max-w-screen-xl">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/restaurant/:id" element={<Detail />} />
                  <Route path="/review/:id" element={<Review />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/search" element={<Search />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
              </div>
            </div>

            <LoginModal />
            <SignupModal />
          </FavouritesProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
