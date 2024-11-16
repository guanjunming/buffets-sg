import { Dialog, useMediaQuery } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { deleteUserReview } from "../../api/api";
import { useModal } from "../../context/ModalProvider";

const DeleteConfirmModal = ({
  reviewId,
  dialogOpen,
  setDialogOpen,
  onSuccessCb,
}) => {
  const fullscreen = useMediaQuery("(max-width:768px)");
  const { openLoginModal } = useModal();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteUserReview,
    onSuccess: () => {
      setDialogOpen(false);
      if (onSuccessCb) {
        onSuccessCb();
      }
    },
    onError: (error) => {
      if (error.response.status === 401) {
        setDialogOpen(false);
        openLoginModal();
      }
    },
  });

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      fullScreen={fullscreen}
    >
      <div
        className="absolute right-2.5 top-2.5 cursor-pointer p-1 hover:opacity-85"
        onClick={() => setDialogOpen(false)}
      >
        <IoClose size={28} />
      </div>

      <div className="mx-auto max-w-[400px] px-8 py-6">
        <h1 className="mt-2 text-center text-xl font-bold">Delete review?</h1>
        <p className="mt-4 text-center">
          Are you sure you want to delete this review? The review cannot be
          retrieved once it is deleted.
        </p>
        <div className="mt-6 flex justify-center gap-5">
          <button
            className="flex-1 rounded border border-blue-900 px-3 py-2 font-medium text-blue-900 hover:bg-neutral-200"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            className="flex-1 rounded bg-blue-900 px-3 py-2 font-medium text-white hover:bg-blue-800"
            onClick={() => mutate(reviewId)}
          >
            Delete
          </button>
        </div>
        {isError && (
          <div className="mt-1 text-right text-xs text-red-700">
            {error.response.data.message}
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default DeleteConfirmModal;
