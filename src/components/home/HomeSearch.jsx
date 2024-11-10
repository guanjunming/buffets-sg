import { FaSearch } from "react-icons/fa";

const HomeSearch = (props) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <input
        className="w-40 rounded border border-gray-400 bg-transparent p-2 hover:border-white"
        list="searches"
        id="search"
        type="search"
        value={props.search}
        onChange={props.handleSearch}
        placeholder="Search…"
      />

      <datalist id="searches">
        {props.names
          .filter(
            (name) =>
              props.search.length >= 2 &&
              name.toLowerCase().includes(props.search.toLowerCase()),
          )
          .map((name, idx) => (
            <option key={idx} value={name} />
          ))}
      </datalist>

      <label htmlFor="search" title="Search by restaurant name">
        <FaSearch size={25} />
      </label>
    </div>
  );
};

export default HomeSearch;
