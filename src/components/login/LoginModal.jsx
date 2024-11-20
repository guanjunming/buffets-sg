import { Dialog, useMediaQuery } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useModal } from "../../context/ModalProvider";
import LoginForm from "./LoginForm";
import { useLocation, useNavigate } from "react-router-dom";

const LoginModal = () => {
  const fullscreen = useMediaQuery("(max-width:768px)");
  const { isLoginOpen, closeLoginModal, openSignupModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    closeLoginModal();
    if (location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  };

  return (
    <Dialog
      open={isLoginOpen}
      onClose={closeLoginModal}
      fullScreen={fullscreen}
    >
      <div
        className="absolute right-2.5 top-2.5 cursor-pointer p-1 hover:opacity-85"
        onClick={closeLoginModal}
      >
        <IoClose size={28} />
      </div>

      <LoginForm
        onSuccessCb={handleLoginSuccess}
        goToSignup={openSignupModal}
      />
    </Dialog>
  );
};

export default LoginModal;
