import { useState } from "react";
import { SiIfood } from "react-icons/si";
import Input from "./Input";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../api/api";
import { useAuth } from "../../context/AuthProvider";

const SignupForm = ({ onSuccessCb, goToLogin }) => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const { loginUser } = useAuth();

  const {
    mutate,
    isPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      loginUser(data);
      onSuccessCb();
    },
  });

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
      setError("Name is required.");
      return;
    }

    if (userData.email === "") {
      setIsError(true);
      setError("Email address is required.");
      return;
    }

    if (userData.password.length < 8) {
      setIsError(true);
      setError("Password must be at least 8 characters.");
      return;
    }

    mutate(userData);
  };

  return (
    <div className="mx-auto w-[500px] px-[50px] pb-6 pt-12 text-left">
      <SiIfood color="rgb(30,58,138)" size={50} />

      {(isError || isRequestError) && (
        <div className="my-4 border border-red-500 p-2.5 text-xs font-semibold text-red-700">
          {isError && error}
          {isRequestError && requestError.message}
        </div>
      )}

      <div className="mb-4 mt-8 text-2xl font-bold">Create your account</div>

      <form onSubmit={handleSubmit} className="py-4">
        <div className="space-y-4">
          <Input
            type="text"
            id="name"
            label="Name"
            placeholder="Name"
            maxLength="40"
          />
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
            Sign up
          </button>
          <div
            className="mt-4 cursor-pointer text-center hover:opacity-85"
            onClick={goToLogin}
          >
            {"Already have an account? "}
            <span className="font-semibold underline">Log in</span>.
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
