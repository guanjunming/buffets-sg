import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { getRestaurantsByQuery } from "../../api/api";

const NavbarSearch = ({ isSuggest }) => {
  const [search, setSearch] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: restaurants = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["restaurants", search],
    queryFn: () => getRestaurantsByQuery(search),
    enabled: !!search,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    search !== "" && navigate("/search?search=" + search);
  };

  useEffect(() => {
    setSearch("");
    inputRef.current.blur();
  }, [location]);

  return (
    <form
      className="relative flex w-full items-center rounded border-2 border-black bg-white"
      onSubmit={handleSearch}
    >
      <label
        className="cursor-pointer p-2"
        htmlFor="search"
        title="Search anything..."
        onClick={handleSearch}
      >
        <FaSearch size={20} />
      </label>

      <input
        className="w-full p-2 focus:outline-none"
        id="search"
        type="search"
        value={search}
        placeholder="Search anything…"
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        ref={inputRef}
      />

      {isSuggest && isFocus && !isPending && !isError && (
        <div
          className="absolute top-full mt-1 w-full rounded border-2 border-black bg-white p-2 shadow-2xl shadow-neutral-500"
          onMouseDown={(e) => e.preventDefault()}
        >
          {restaurants.map(
            (restaurant, idx) =>
              idx < 5 && (
                <Link
                  key={restaurant._id}
                  className="flex items-center gap-2 p-2 hover:bg-neutral-200"
                  to={"/restaurant/" + restaurant._id}
                >
                  <img
                    className="aspect-video h-10 rounded object-cover"
                    src={restaurant.img}
                    alt={restaurant.name}
                    title={restaurant.name}
                  />
                  <div className="text-sm font-medium">{restaurant.name}</div>
                </Link>
              ),
          )}
          <div className="p-2">
            <span
              className="cursor-pointer text-sm text-blue-950 underline hover:text-blue-800"
              onClick={handleSearch}
            >
              See all results ({restaurants.length})
            </span>
          </div>
        </div>
      )}
    </form>
  );
};

export default NavbarSearch;
