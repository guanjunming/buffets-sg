import { Pagination, PaginationItem } from "@mui/material";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const ReviewsSection = ({ id, reviews }) => {
  const [page, setPage] = useState(1);
  const [isPageChanged, setIsPageChanged] = useState(false);
  const topRef = useRef(null);

  const reviewsPerPage = 10;
  const totalReviews = reviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const startIndex = (page - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  const startResult = startIndex + 1;
  const endResult = Math.min(endIndex, totalReviews);

  useEffect(() => {
    // this check is to prevent scolling when page loads
    if (isPageChanged) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isPageChanged, page]);

  const handlePageChange = (event, value) => {
    if (page !== value) {
      if (!isPageChanged) {
        setIsPageChanged(true);
      }
      setPage(value);
    }
  };

  return (
    <div className="relative">
      <div ref={topRef} className="absolute -top-52"></div>
      {totalReviews > 0 ? (
        <>
          <div className="space-y-5">
            {currentReviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
          <div className="mt-4 flex flex-col items-center space-y-2 p-2">
            <Pagination
              count={totalPages}
              size="large"
              page={page}
              onChange={handlePageChange}
              hidePrevButton={totalPages <= 1}
              hideNextButton={totalPages <= 1}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    "&.MuiPaginationItem-root": {
                      fontWeight: "bold",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "black",
                      },
                    },
                  }}
                />
              )}
            />
            <div className="text-sm">
              Showing results {startResult}-{endResult} of {totalReviews}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-8 rounded-lg border border-gray-300 px-5 py-10">
          <p className="text-center text-2xl font-bold md:max-w-[500px]">
            No reviews yet. Be the first to share your experience!
          </p>
          <Link
            to={`/review/${id}`}
            className="rounded-md bg-blue-900 px-4 py-3 text-white hover:bg-blue-800"
          >
            Write a review
          </Link>
        </div>
      )}
    </div>
  );
};
export default ReviewsSection;
