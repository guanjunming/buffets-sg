import { Avatar, Rating } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { formatDate } from "../../utils/utils";

const ReviewCard = ({ review }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      setShowReadMore(
        textRef.current.scrollHeight > textRef.current.clientHeight,
      );
    }
  }, []);

  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <Avatar sx={{ width: 32, height: 32 }} />
          <p>{review.user.name}</p>
        </div>
        <div className="relative">
          <button className="rounded-full p-1.5 hover:bg-gray-100">
            <BsThreeDots size={20} />
          </button>
        </div>
      </div>
      <div className="flex">
        <Rating
          value={review.rating}
          precision={0.1}
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
  );
};

export default ReviewCard;
