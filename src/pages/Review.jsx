import { CircularProgress, Rating, Skeleton, Snackbar } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  createUserReview,
  getRestaurantById,
  getReviewByRestaurantId,
  updateUserReview,
} from "../api/api";
import { useModal } from "../context/ModalProvider";
import { useAuth } from "../context/AuthProvider";
import { MdThumbUp } from "react-icons/md";

const labels = {
  1: "Terrible",
  2: "Poor",
  3: "Average",
  4: "Very Good",
  5: "Excellent",
};

const reviewMinLength = 100;

const Review = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [showSysMsg, setShowSysMsg] = useState(false);
  const [sysMsg, setSysMsg] = useState("");

  const { openLoginModal } = useModal();
  const { isLoggedIn } = useAuth();

  const { data: restaurant, isError } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id),
  });

  const { data: userReview } = useQuery({
    queryKey: ["review", id],
    queryFn: () => getReviewByRestaurantId(id),
    enabled: !!restaurant && isLoggedIn,
  });

  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating || 0);
      setTitle(userReview.title || "");
      setReview(userReview.review || "");
    }
  }, [userReview]);

  const {
    mutate,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
    isSuccess,
  } = useMutation({
    mutationFn: (data) =>
      userReview
        ? updateUserReview(userReview._id, data)
        : createUserReview(id, data),
    onSuccess: () => {
      setSysMsg("Your review is saved.");
      setShowSysMsg(true);
    },
    onError: (error) => {
      if (error.response.status === 401) {
        openLoginModal();
      }
    },
  });

  const validateForm = () => {
    const errors = {};
    if (!rating) {
      errors.rating = "Please provide a rating";
    }
    if (title.trim().length === 0) {
      errors.title = "Add a title to your review";
    }
    if (review.trim().length < reviewMinLength) {
      errors.review = `Review must have a minimum of ${reviewMinLength} characters`;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setSysMsg("Please provide the required fields.");
      setShowSysMsg(true);
      return;
    }

    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    const data = {
      title,
      review,
      rating,
    };
    mutate(data);
  };

  if (isError) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mb-20 px-5 py-5 lg:px-10 lg:py-10">
      <div className="mx-auto flex max-w-[600px] flex-col gap-6 lg:max-w-none lg:flex-row lg:gap-14">
        <div className="border-gray-200 lg:w-[400px] lg:border-r">
          <h1 className="mb-8 hidden w-80 text-4xl font-extrabold leading-tight lg:block">
            How was your visit?
          </h1>
          <div className="flex gap-4 rounded border border-gray-200 p-4 lg:w-64 lg:flex-col">
            <Link to={`/restaurant/${id}`}>
              {restaurant ? (
                <img
                  src={restaurant.img}
                  alt={restaurant.name}
                  className="aspect-square h-20 w-20 min-w-20 object-cover lg:h-full lg:w-full"
                />
              ) : (
                <Skeleton variant="rectangular" width={80} height={80} />
              )}
            </Link>

            {restaurant && (
              <div className="space-y-0.5">
                <Link to={`/restaurant/${id}`} className="font-bold">
                  {restaurant.name}
                </Link>
                <div className="text-sm">{restaurant.address}</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          {isSuccess ? (
            <div className="mx-auto mt-4 flex w-[340px] flex-col items-center gap-3 rounded-lg bg-emerald-50 px-8 py-5">
              <div className="rounded-full bg-green-600 p-2">
                <MdThumbUp color="white" size={18} />
              </div>
              <div className="text-center text-2xl font-bold">
                Thanks for sharing your feast with us!
              </div>
              <div className="text-center text-sm">
                Stories like yours are what helps others savor the best buffet
                experiences.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div>
                <div className="text-xl font-bold">
                  How would you rate your experience?
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Rating
                    value={rating}
                    precision={1}
                    size="large"
                    onChange={(event, newValue) => setRating(newValue)}
                    onChangeActive={(event, newHover) => setHover(newHover)}
                    sx={{
                      fontSize: "3rem",
                      color: "rgb(30,64,175)",
                      "& .MuiRating-icon": { color: "rgb(30,64,175)" },
                    }}
                  />
                  {rating !== null && (
                    <div>{labels[hover !== -1 ? hover : rating]}</div>
                  )}
                </div>
                {validationErrors.rating && rating === 0 && (
                  <div className="mt-1 text-xs text-red-700">
                    {validationErrors.rating}
                  </div>
                )}
              </div>
              <div>
                <div className="text-xl font-bold">Title your review</div>
                <div className="mt-3 space-y-2">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Sum up your experience in a few words"
                    maxLength="120"
                    className="w-full rounded border-2 p-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className="text-right text-xs">{`${title.trim().length}/120 max characters`}</div>
                  {validationErrors.title && title.trim().length === 0 && (
                    <div className="text-xs text-red-700">
                      {validationErrors.title}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xl font-bold">Write your review</div>
                <div className="mt-3 space-y-2">
                  <textarea
                    id="review"
                    name="review"
                    placeholder="Share details about the food, service, and atmosphere..."
                    minLength={reviewMinLength}
                    rows="5"
                    className="w-full overflow-y-auto rounded border-2 p-4"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                  {review.trim().length < reviewMinLength && (
                    <>
                      <div className="text-right text-xs">{`${review.trim().length}/${reviewMinLength} min characters`}</div>
                      {validationErrors.review && (
                        <div className="text-xs text-red-700">
                          {validationErrors.review}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div>
                <button
                  disabled={isCreatePending}
                  className="w-full rounded-full bg-blue-900 px-3 py-4 font-bold text-white hover:cursor-pointer hover:bg-blue-800 disabled:opacity-80"
                >
                  {isCreatePending ? (
                    <CircularProgress
                      size={18}
                      sx={{ color: "white", marginBottom: "-2px" }}
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
                {isCreateError && createError.response.status !== 401 && (
                  <div className="mt-0.5 text-xs text-red-700">
                    {Array.isArray(createError.response.data.message)
                      ? createError.response.data.message[0]
                      : "An error occured."}
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showSysMsg}
        onClose={() => setShowSysMsg(false)}
        autoHideDuration={3000}
        message={sysMsg}
      />
    </div>
  );
};

export default Review;
