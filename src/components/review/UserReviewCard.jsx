import { Avatar, Rating } from "@mui/material";
import ReviewActionButton from "./ReviewActionButton";
import { formatDate } from "../../utils/utils";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const UserReviewCard = ({ review, userId, name }) => {
  const { restaurant } = review;
  const queryClient = useQueryClient();

  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["user", userId],
    });
  };

  return (
    <div className="border-b border-gray-300 bg-white pb-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar sx={{ width: 40, height: 40 }} />

          <div>
            <p className="text-sm">
              <span className="font-bold">{name}</span>
            </p>
            <div className="text-xs text-gray-500">{`${formatDate(review.createdAt, false)}`}</div>
          </div>
        </div>

        <></>
        <ReviewActionButton
          reviewId={review._id}
          restaurantId={review.restaurant._id}
          onSuccessCb={handleDeleteSuccess}
        />
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
      <div className="my-0.5 font-bold">{review.title}</div>
      <p className="line-clamp-3 break-words">{review.review}</p>

      <Link
        to={`/restaurant/${review.restaurant._id}`}
        className="mt-3 block max-w-[400px] overflow-hidden"
      >
        <div className="flex items-center gap-2 rounded border border-gray-200">
          <img
            src={restaurant.img[0]}
            alt={restaurant.name}
            className="aspect-square h-16 w-16 min-w-16 rounded object-cover"
          />
          <div className="overflow-hidden">
            <p className="truncate text-xs font-bold">{restaurant.name}</p>
            <div className="flex items-end gap-1 text-xs">
              <Rating
                value={restaurant.averageRating}
                precision={0.1}
                size="small"
                sx={{
                  color: "rgb(30,64,175)",
                  "& .MuiRating-icon": {
                    color: "rgb(30,64,175)",
                    width: "1rem",
                  },
                }}
                readOnly
              />
              <span className="font-bold">{restaurant.averageRating}</span>
            </div>

            <div className="text-xs">
              {`${restaurant.reviewCount} Review${restaurant.reviewCount > 1 ? "s" : ""}`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserReviewCard;
