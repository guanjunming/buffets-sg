import { useMutation } from "@tanstack/react-query";
import Input from "../login/Input";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import { updatePassword } from "../../api/api";
import { useAuth } from "../../context/AuthProvider";

const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [showSysMsg, setShowSysMsg] = useState(false);
  const { loginUser } = useAuth();

  const {
    mutate,
    isPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      setShowSysMsg(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      loginUser(data);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsError(false);
    setError("");

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const userData = {
      passwordCurrent: data.passwordCurrent.trim(),
      passwordNew: data.passwordNew.trim(),
      passwordConfirm: data.passwordConfirm.trim(),
    };

    if (userData.passwordCurrent === "") {
      setIsError(true);
      setError("Current password is required.");
      return;
    }

    if (userData.passwordNew.length < 8) {
      setIsError(true);
      setError("Password must be at least 8 characters.");
      return;
    }

    if (userData.passwordNew != userData.passwordConfirm) {
      setIsError(true);
      setError("Passwords don't match.");
      return;
    }

    mutate(userData);
  };

  return (
    <div>
      <div className="px-3">
        <h3 className="border-b border-gray-300 py-3 text-lg font-semibold">
          Password Settings
        </h3>
      </div>
      <div className="mx-auto w-4/5 sm:w-3/5">
        <div className="mt-4 text-sm text-red-700">
          {isError && error}
          {isRequestError && requestError.message}
        </div>
        <form onSubmit={handleSubmit} className="py-6">
          <div className="space-y-4">
            <Input
              type="password"
              id="passwordCurrent"
              label="Current password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
            <Input
              type="password"
              id="passwordNew"
              label="New password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <Input
              type="password"
              id="passwordConfirm"
              label="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <div className="mt-10 flex justify-center">
            <button
              disabled={isPending}
              className="rounded bg-blue-900 px-4 py-2 text-sm text-white hover:bg-blue-800"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showSysMsg}
        onClose={() => setShowSysMsg(false)}
        autoHideDuration={4000}
        message={"Your password has been changed successfully."}
      />
    </div>
  );
};

export default PasswordForm;
