const HomeFilter = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:justify-start">
      {[
        "All categories",
        "Nearby",
        "Recently viewed",
        "Most reviewed",
        "Highest ratings",
      ].map((item, idx) => (
        <div
          key={idx}
          className="rounded-full border border-neutral-500 px-3 py-1 hover:cursor-pointer hover:border-black hover:bg-neutral-200"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default HomeFilter;
