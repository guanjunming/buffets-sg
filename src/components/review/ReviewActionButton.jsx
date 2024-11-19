import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ReviewActionButton = ({ reviewId, restaurantId, onSuccessCb }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setDropdownOpen(false));
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <>
      {dialogOpen && (
        <DeleteConfirmModal
          reviewId={reviewId}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          onSuccessCb={onSuccessCb}
        />
      )}

      <div ref={dropdownRef} className="relative">
        <button
          onClick={toggleDropdown}
          className="rounded-full p-1.5 hover:bg-gray-100"
        >
          <BsThreeDots size={20} />
        </button>
        {dropdownOpen && (
          <div className="box-shadow absolute right-0 z-10 -mr-3 mt-1 w-36 rounded bg-white p-2">
            <div className="absolute -top-2 right-5 h-0 w-0 border-b-8 border-l-8 border-r-8 border-transparent border-b-white"></div>
            <Link
              to={`/review/${restaurantId}`}
              className="block w-full rounded px-3 py-2 text-left font-medium hover:bg-neutral-200"
            >
              Edit
            </Link>
            <button
              onClick={() => {
                setDialogOpen(true);
                setDropdownOpen(false);
              }}
              className="w-full rounded px-3 py-2 text-left font-medium hover:bg-neutral-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewActionButton;
