const SearchSort = ({ sort, handleSortChange }) => {
  return (
    <div className="flex flex-col items-center gap-2 lg:items-start">
      <label className="text-xl" htmlFor="sort">
        Sort By
      </label>

      <select
        className="cursor-pointer p-2 shadow shadow-black hover:outline hover:outline-black"
        id="sort"
        value={sort}
        onChange={handleSortChange}
      >
        <optgroup label="Name">
          <option value="name,asc">Name (A to Z)</option>
          <option value="name,desc">Name (Z to A)</option>
        </optgroup>
        <optgroup label="Price">
          <option value="price,asc">Price (lowest first)</option>
          <option value="price,desc">Price (highest first)</option>
        </optgroup>
      </select>
    </div>
  );
};

export default SearchSort;
