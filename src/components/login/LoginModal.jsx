import { Dialog, useMediaQuery } from "@mui/material";
import Input from "./Input";
import { SiIfood } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/api";

const LoginModal = ({ open, onClose }) => {
  const fullscreen = useMediaQuery("(max-width:768px)");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      //   loginUser({
      //     userId: data.id,
      //     username: data.fields.Username,
      //   });
      onClose();
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);
    mutate(userData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullscreen}>
      <div
        className="absolute right-2.5 top-2.5 cursor-pointer p-1 hover:opacity-85"
        onClick={onClose}
      >
        <IoClose size={28} />
      </div>
      <div className="mx-auto w-[500px] px-[50px] pb-6 pt-12 text-left">
        <SiIfood color="blue" size={50} />

        {isError && (
          <div className="my-4 border border-red-500 p-2.5 text-xs font-semibold text-red-700">
            {error.message}
          </div>
        )}

        <div className="mb-4 mt-8 text-2xl font-bold">Welcome back.</div>

        <form onSubmit={handleSubmit} className="py-4">
          <div className="space-y-4">
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
              Sign in
            </button>
            <p className="mt-4 cursor-pointer text-center text-black hover:opacity-85">
              {"Don't have an account? "}
              <span className="font-semibold underline">Sign up</span>
              {"."}
            </p>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default LoginModal;
