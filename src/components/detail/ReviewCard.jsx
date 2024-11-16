import { Avatar, Rating } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { formatDate } from "../../utils/utils";
import { useClickOutside } from "@mantine/hooks";
import { useAuth } from "../../context/AuthProvider";
import DeleteConfirmModal from "../review/DeleteConfirmModal";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const textRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setDropdownOpen(false));
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (textRef.current) {
      setShowReadMore(
        textRef.current.scrollHeight > textRef.current.clientHeight,
      );
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <>
      {dialogOpen && (
        <DeleteConfirmModal
          reviewId={review._id}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          onSuccessCb={() =>
            queryClient.invalidateQueries({
              queryKey: ["restaurant", review.restaurant],
            })
          }
        />
      )}

      <div className="border-b border-gray-200 pb-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Avatar sx={{ width: 32, height: 32 }} />
            <p>{review.user.name}</p>
          </div>
          {user?.id === review.user._id && (
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
                    to={`/review/${review.restaurant}`}
                    className="block w-full rounded px-3 py-2 text-left font-medium text-black hover:bg-gray-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      setDialogOpen(true);
                      setDropdownOpen(false);
                    }}
                    className="w-full rounded px-3 py-2 text-left font-medium text-black hover:bg-gray-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex">
          <Rating
            value={review.rating}
            precision={1}
            sx={{
              color: "rgb(30,64,175)",
              "& .MuiRating-icon": { color: "rgb(30,64,175)" },
            }}
            readOnly
          />
        </div>
        <div className="my-2 font-bold">{review.title}</div>
        <div>
          <p
            ref={textRef}
            className={`whitespace-pre-wrap ${isReadMore ? "" : "line-clamp-3"}`}
          >
            {review.review}
          </p>
          {showReadMore && (
            <button
              onClick={() => setIsReadMore((prev) => !prev)}
              className="flex items-center gap-1 text-blue-500 underline hover:text-blue-700"
            >
              <span>{isReadMore ? "Read less" : "Read more"}</span>{" "}
              {isReadMore ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
          )}
        </div>
        <div className="mt-4 text-xs">{`Written ${formatDate(review.createdAt)}`}</div>
      </div>
    </>
  );
};

export default ReviewCard;
