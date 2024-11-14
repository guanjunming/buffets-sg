import { Dialog, useMediaQuery } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useModal } from "../../context/ModalProvider";
import LoginForm from "./LoginForm";

const LoginModal = () => {
  const fullscreen = useMediaQuery("(max-width:768px)");
  const { isLoginOpen, closeLoginModal, openSignupModal } = useModal();

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

      <LoginForm onSuccessCb={closeLoginModal} goToSignup={openSignupModal} />
    </Dialog>
  );
};

export default LoginModal;
