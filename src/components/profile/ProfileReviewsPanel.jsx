import { Link } from "react-router-dom";
import UserReviewCard from "../review/UserReviewCard";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const ProfileReviewsPanel = ({ reviews, user }) => {
  const PAGE_SIZE = 15;
  const [reviewsToShow, setReviewsToShow] = useState(PAGE_SIZE);

  const handleShowMore = () => {
    setReviewsToShow((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="w-full rounded-md border border-gray-200 p-6">
      {reviews.length > 0 ? (
        <div>
          <div className="space-y-5">
            {reviews.slice(0, reviewsToShow).map((review) => (
              <UserReviewCard
                key={review._id}
                review={review}
                name={user.name}
              />
            ))}
          </div>
          {reviewsToShow < reviews.length && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleShowMore}
                className="rounded-lg bg-blue-900 px-4 py-3 text-white hover:bg-blue-800"
              >
                <div className="flex items-center gap-1">
                  <span>Show more</span>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="m-auto max-w-[550px] p-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h3 className="text-xl font-bold">Write your first review!</h3>
            <p className="text-gray-600">
              Your thoughts can guide others to the best dining experiences.
              Start by reviewing your favorite buffet restaurant!
            </p>
            <Link
              to="/"
              className="rounded-md bg-blue-900 px-4 py-3 text-white hover:bg-blue-800"
            >
              Find Buffets
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileReviewsPanel;
