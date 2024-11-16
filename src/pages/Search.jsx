import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LuFolderSearch } from "react-icons/lu";
import { getRestaurantsMaxPrice, getRestaurantsByQuery } from "../api/api";
import SearchFilter from "../components/search/SearchFilter";
import SearchSort from "../components/search/SearchSort";
import HomeSkeleton from "../components/home/HomeSkeleton";
import HomeRestaurant from "../components/home/HomeRestaurant";

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams?.get("search") || "";
  const initialMinPrice = searchParams?.get("minPrice") || "0";
  const initialMaxPrice = searchParams?.get("maxPrice") || "";
  const initialSortBy = searchParams?.get("sortBy") || "name";
  const initialSortOrder = searchParams?.get("sortOrder") || "asc";

  const [price, setPrice] = useState([
    parseInt(initialMinPrice) || 0,
    parseInt(initialMaxPrice) || parseInt(initialMinPrice) + 5 || 5,
  ]);
  const [sort, setSort] = useState(initialSortBy + "," + initialSortOrder);

  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["restaurantsMaxPrice"],
    queryFn: getRestaurantsMaxPrice,
    initialData: [{ maxPrice: 5 }],
  });

  const {
    data: restaurants = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "restaurants",
      initialSearch,
      initialMinPrice,
      initialMaxPrice,
      initialSortBy,
      initialSortOrder,
    ],
    queryFn: () =>
      getRestaurantsByQuery(
        initialSearch,
        initialMinPrice,
        initialMaxPrice,
        initialSortBy,
        initialSortOrder,
      ),
  });

  const handleSliderChange = (e, newPrice, activeThumb) => {
    if (newPrice[1] - newPrice[0] < 5) {
      if (activeThumb === 0) {
        const min = Math.min(newPrice[0], query.data[0].maxPrice - 5);
        setPrice([min, min + 5]);
      } else {
        const max = Math.max(newPrice[1], 5);
        setPrice([max - 5, max]);
      }
    } else {
      setPrice(newPrice);
    }
  };

  const handleSortChange = (e) => setSort(e.target.value);

  const handleFilterReset = () => {
    setPrice([
      parseInt(initialMinPrice) || 0,
      parseInt(initialMaxPrice) || parseInt(initialMinPrice) + 5 || 5,
    ]);
    setSort(initialSortBy + "," + initialSortOrder);
  };

  const handleFilterSubmit = () => {
    navigate(
      "/search?search=" +
        initialSearch +
        "&minPrice=" +
        price[0] +
        "&maxPrice=" +
        price[1] +
        "&sortBy=" +
        sort.split(",")[0] +
        "&sortOrder=" +
        sort.split(",")[1],
    );
  };

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-10">
      <div className="text-2xl">Search results for: {initialSearch}</div>

      <div className="flex flex-col gap-10 rounded-3xl bg-neutral-100 px-10 pb-5 pt-10 sm:mx-5 lg:gap-5">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:items-start lg:items-center">
          <SearchFilter
            max={query.data[0].maxPrice}
            price={price}
            handleSliderChange={handleSliderChange}
          />
          <SearchSort sort={sort} handleSortChange={handleSortChange} />
        </div>

        <div className="flex items-center justify-center gap-5">
          <div
            className="rounded border border-blue-900 px-3 py-2 font-medium text-blue-900 hover:cursor-pointer hover:bg-neutral-200"
            onClick={handleFilterReset}
          >
            Reset
          </div>
          <div
            className="rounded bg-blue-900 px-3 py-2 text-white hover:cursor-pointer hover:bg-blue-800"
            onClick={handleFilterSubmit}
          >
            Apply
          </div>
        </div>
      </div>

      {isPending && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {Array(9)
            .fill("a")
            .map((item, idx) => (
              <HomeSkeleton key={idx} />
            ))}
        </div>
      )}
      {isError && (
        <div>
          Error: {error?.message || "Failed to fetch restaurants by query"}
        </div>
      )}
      {!isPending && !isError && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {restaurants.map((restaurant) => (
            <HomeRestaurant
              key={restaurant._id}
              id={restaurant._id}
              name={restaurant.name}
              img={restaurant.img}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating} //to add
              review={restaurant.review} //to add
            />
          ))}
        </div>
      )}
      {!isPending && !isError && restaurants.length === 0 && (
        <div className="m-5 flex flex-col items-center justify-center gap-5">
          <LuFolderSearch size={80} />
          <div className="text-2xl">No matches found</div>
        </div>
      )}
    </div>
  );
};

export default Search;
