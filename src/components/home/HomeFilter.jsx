const HomeFilter = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-2 lg:flex-row lg:items-center">
      {[
        "All categories",
        "Nearby",
        "Recently viewed",
        "Most reviewed",
        "Highest ratings",
      ].map((item, idx) => (
        <div
          key={idx}
          className="rounded-full border px-3 py-1 hover:cursor-pointer hover:bg-neutral-800"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default HomeFilter;
