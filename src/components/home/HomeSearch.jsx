import { FaSearch } from "react-icons/fa";

const HomeSearch = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      <input
        className="w-40 rounded border border-gray-400 bg-transparent p-2 hover:border-white"
        placeholder="Search…"
      />
      <FaSearch size={25} />
    </div>
  );
};

export default HomeSearch;
