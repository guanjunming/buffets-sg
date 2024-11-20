import { Avatar, Rating } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { formatDate, getProfileImageUrl } from "../../utils/utils";
import { useAuth } from "../../context/AuthProvider";
import ReviewActionButton from "../review/ReviewActionButton";
import { useQueryClient } from "@tanstack/react-query";

const ReviewCard = ({ review }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const textRef = useRef(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleReadMore = () => {
      if (textRef.current) {
        setShowReadMore(
          textRef.current.scrollHeight > textRef.current.clientHeight,
        );
      }
    };

    handleReadMore();
    window.addEventListener("resize", handleReadMore);
    return () => {
      window.removeEventListener("resize", handleReadMore);
    };
  }, []);

  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["restaurant", review.restaurant],
    });
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden font-semibold">
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={getProfileImageUrl(review.user?.profileImage)}
          />
          <p>{review.user?.name || "Unknown"}</p>
        </div>
        {review.user && review.user._id === user?._id && (
          <ReviewActionButton
            reviewId={review._id}
            restaurantId={review.restaurant}
            onSuccessCb={handleDeleteSuccess}
          />
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
      <div className="my-2 font-semibold" style={{ wordBreak: "break-word" }}>
        {review.title}
      </div>
      <div>
        <p
          ref={textRef}
          className={`whitespace-pre-wrap break-words ${isReadMore ? "" : "line-clamp-3"}`}
          style={{ wordBreak: "break-word" }}
        >
          {review.review}
        </p>
        {showReadMore && (
          <button
            onClick={() => setIsReadMore((prev) => !prev)}
            className="flex items-center gap-1 text-blue-600 underline hover:text-blue-800"
          >
            <span>{isReadMore ? "Read less" : "Read more"}</span>{" "}
            {isReadMore ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
        )}
      </div>
      <div className="mt-4 text-sm">{`Written ${formatDate(review.createdAt)}`}</div>
    </div>
  );
};

export default ReviewCard;
