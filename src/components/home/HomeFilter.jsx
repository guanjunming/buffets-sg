const HomeFilter = ({ tab, sortBy }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div
        className={
          tab?.all
            ? "rounded-full border border-black bg-black px-3 py-1 text-white"
            : "rounded-full border border-black px-3 py-1 text-black hover:cursor-pointer hover:bg-neutral-200"
        }
        onClick={() => sortBy("all")}
      >
        All categories
      </div>
      <div
        className={
          tab?.rating
            ? "rounded-full border border-black bg-black px-3 py-1 text-white"
            : "rounded-full border border-black px-3 py-1 text-black hover:cursor-pointer hover:bg-neutral-200"
        }
        onClick={() => sortBy("rating")}
      >
        Highest ratings
      </div>
      <div
        className={
          tab?.review
            ? "rounded-full border border-black bg-black px-3 py-1 text-white"
            : "rounded-full border border-black px-3 py-1 text-black hover:cursor-pointer hover:bg-neutral-200"
        }
        onClick={() => sortBy("review")}
      >
        Most reviewed
      </div>
      <div
        className={
          tab?.nearest
            ? "rounded-full border border-black bg-black px-3 py-1 text-white"
            : "rounded-full border border-black px-3 py-1 text-black hover:cursor-pointer hover:bg-neutral-200"
        }
        onClick={() => sortBy("nearest")}
      >
        Nearest
      </div>
    </div>
  );
};

export default HomeFilter;
