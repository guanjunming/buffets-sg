const HomeFilter = ({
  isAll,
  sortByAlphabet,
  isRating,
  sortByHighestRatings,
  isReview,
  sortByMostReviewed,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:justify-start">
      <div
        className={
          isAll
            ? "rounded-full border border-black bg-black px-3 py-1 text-white hover:cursor-pointer hover:bg-neutral-800"
            : "rounded-full border border-black px-3 py-1 text-black hover:cursor-pointer hover:bg-neutral-200"
        }
        onClick={sortByAlphabet}
      >
        All categories
      </div>
      <div
        className={
          isRating
            ? "rounded-full border border-black bg-black px-3 py-1 text-white hover:cursor-pointer hover:bg-neutral-800"
            : "rounded-full border border-black px-3 py-1 text-black hover:cursor-pointer hover:bg-neutral-200"
        }
        onClick={sortByHighestRatings}
      >
        Highest ratings
      </div>
      <div
        className={
          isReview
            ? "rounded-full border border-black bg-black px-3 py-1 text-white hover:cursor-pointer hover:bg-neutral-800"
            : "rounded-full border border-black px-3 py-1 text-black hover:cursor-pointer hover:bg-neutral-200"
        }
        onClick={sortByMostReviewed}
      >
        Most reviewed
      </div>
    </div>
  );
};

export default HomeFilter;
