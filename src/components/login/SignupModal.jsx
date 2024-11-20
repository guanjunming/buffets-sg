import { Dialog, useMediaQuery } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useModal } from "../../context/ModalProvider";
import SignupForm from "./SignupForm";
import { useLocation, useNavigate } from "react-router-dom";

const SignupModal = () => {
  const fullscreen = useMediaQuery("(max-width:768px)");
  const { isSignupOpen, closeSignupModal, openLoginModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    closeSignupModal();
    if (location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  };

  return (
    <Dialog
      open={isSignupOpen}
      onClose={closeSignupModal}
      fullScreen={fullscreen}
    >
      <div
        className="absolute right-2.5 top-2.5 cursor-pointer p-1 hover:opacity-85"
        onClick={closeSignupModal}
      >
        <IoClose size={28} />
      </div>

      <SignupForm
        onSuccessCb={handleSignupSuccess}
        goToLogin={openLoginModal}
      />
    </Dialog>
  );
};

export default SignupModal;
