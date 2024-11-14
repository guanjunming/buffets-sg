import { Dialog, useMediaQuery } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useModal } from "../../context/ModalProvider";
import SignupForm from "./SignupForm";

const SignupModal = () => {
  const fullscreen = useMediaQuery("(max-width:768px)");
  const { isSignupOpen, closeSignupModal, openLoginModal } = useModal();

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

      <SignupForm onSuccessCb={closeSignupModal} goToLogin={openLoginModal} />
    </Dialog>
  );
};

export default SignupModal;
