import { SiIfood } from "react-icons/si";
import Input from "./Input";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/api";
import { useAuth } from "../../context/AuthProvider";

const LoginForm = ({ onSuccessCb, goToSignup }) => {
  const { loginUser } = useAuth();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginUser(data);
      onSuccessCb();
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);
    mutate(userData);
  };

  return (
    <div className="mx-auto w-[500px] px-[50px] pb-6 pt-12 text-left">
      <SiIfood color="rgb(30,58,138)" size={50} />

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
            id="email"
            label="Email address"
            placeholder="Email"
          />
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Password"
          />
        </div>

        <div className="m-auto mt-6 w-80">
          <button
            disabled={isPending}
            className="my-4 w-full rounded bg-blue-900 px-4 py-3 font-medium text-white shadow-lg hover:bg-blue-800"
          >
            Sign in
          </button>
          <div
            className="mt-4 cursor-pointer text-center hover:opacity-85"
            onClick={goToSignup}
          >
            {"Don't have an account? "}
            <span className="font-semibold underline">Sign up</span>.
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
