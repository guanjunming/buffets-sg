import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const NavbarSearch = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <input
        className="w-full rounded border border-neutral-500 bg-transparent p-2 hover:border-black"
        list="searches"
        id="search"
        type="search"
        value={search}
        onChange={handleSearch}
        placeholder="Search…"
      />

      <label htmlFor="search" title="Search by restaurant name">
        <FaSearch size={25} />
      </label>
    </div>
  );
};

export default NavbarSearch;
