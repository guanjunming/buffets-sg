import { useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "../login/Input";
import { updateProfile } from "../../api/api";
import { useState } from "react";
import { Snackbar } from "@mui/material";

const ProfileForm = ({ name }) => {
  const [nameInput, setNameInput] = useState(name);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const [showSysMsg, setShowSysMsg] = useState(false);

  const {
    mutate,
    isPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      setNameInput(data.data.name);
      setShowSysMsg(true);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsError(false);
    setError("");

    const name = nameInput.trim();
    if (name === "") {
      setIsError(true);
      setError("Name is required.");
      return;
    }

    mutate({ name });
  };
  return (
    <div>
      <div className="px-3">
        <h3 className="border-b border-gray-300 py-3 text-lg font-semibold">
          Profile Info
        </h3>
      </div>
      <div className="mx-auto w-4/5 sm:w-3/5">
        <div className="mt-4 text-sm text-red-700">
          {isError && error}
          {isRequestError && requestError.message}
        </div>
        <form onSubmit={handleSubmit} className="py-6">
          <div>
            <Input
              type="text"
              id="name"
              label="Name"
              placeholder="Name"
              maxLength="40"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
            />
          </div>

          <div className="mt-10 flex justify-center">
            <button
              disabled={isPending}
              className="rounded bg-blue-900 px-4 py-2 text-sm text-white hover:bg-blue-800"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showSysMsg}
        onClose={() => setShowSysMsg(false)}
        autoHideDuration={4000}
        message={"Your profile has been updated successfully."}
      />
    </div>
  );
};

export default ProfileForm;
