import { Dialog, useMediaQuery } from "@mui/material";
import Input from "./Input";
import { SiIfood } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../api/api";
import { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";

const SignupModal = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const fullscreen = useMediaQuery("(max-width:768px)");
  const { isSignupOpen, closeSignupModal, openLoginModal } = useModal();
  const { loginUser } = useAuth();

  const {
    mutate,
    isPending,
    isError: isRequestError,
    error: requestError,
    reset,
  } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      loginUser(data);
      closeSignupModal();
    },
  });

  useEffect(() => {
    if (isSignupOpen) {
      setIsError(false);
      setError("");
      reset();
    }
  }, [isSignupOpen, reset]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsError(false);
    setError("");

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const userData = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    };

    if (userData.name === "") {
      setIsError(true);
      setError("Please enter your name.");
      return;
    }

    if (userData.password.length < 6) {
      setIsError(true);
      setError("Your password must be at least 6 characters.");
      return;
    }

    mutate(userData);
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
      <div className="mx-auto w-[500px] px-[50px] pb-6 pt-12 text-left">
        <SiIfood color="blue" size={50} />

        {(isError || isRequestError) && (
          <div className="my-4 border border-red-500 p-2.5 text-xs font-semibold text-red-700">
            {isError && error}
            {isRequestError && requestError.message}
          </div>
        )}

        <div className="mb-4 mt-8 text-2xl font-bold">Create your account</div>

        <form onSubmit={handleSubmit} className="py-4">
          <div className="space-y-4">
            <Input type="text" name="name" label="Name" placeholder="Name" />
            <Input
              type="email"
              name="email"
              label="Email address"
              placeholder="Email"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              styles="tracking-widest "
            />
          </div>

          <div className="m-auto mt-6 w-80">
            <button
              disabled={isPending}
              className="my-4 w-full rounded bg-black px-4 py-3 font-medium text-white shadow-lg hover:bg-gray-900"
            >
              Sign up
            </button>
            <div
              className="mt-4 cursor-pointer text-center text-black hover:opacity-85"
              onClick={openLoginModal}
            >
              {"Already have an account? "}
              <span className="font-semibold underline">Log in</span>.
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default SignupModal;
