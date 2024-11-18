import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LuFolderSearch } from "react-icons/lu";
import {
  getRestaurantsMaxPriceCuisines,
  getRestaurantsByQuery,
} from "../api/api";
import SearchPrice from "../components/search/SearchPrice";
import SearchSort from "../components/search/SearchSort";
import SearchCuisine from "../components/search/SearchCuisine";
import SearchSkeleton from "../components/search/SearchSkeleton";
import SearchRestaurant from "../components/search/SearchRestaurant";

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams?.get("search") || "";
  const initialCuisine =
    searchParams?.get("cuisine") || "0c1c2c3c4c5c6c7c8c9c10c11c12c13c14c15";
  const initialMinPrice = searchParams?.get("minPrice") || "0";
  const initialMaxPrice = searchParams?.get("maxPrice") || "";
  const initialSortBy = searchParams?.get("sortBy") || "name";
  const initialSortOrder = searchParams?.get("sortOrder") || "asc";

  const [price, setPrice] = useState([]);
  const [sort, setSort] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState([]);

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["restaurantsMaxPriceCuisines"],
    queryFn: getRestaurantsMaxPriceCuisines,
    staleTime: Infinity,
  });
  const maxPrice = data?.maxPrice || 5;
  const cuisines = data?.cuisines || [];

  const {
    data: restaurants = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "restaurants",
      initialSearch,
      initialCuisine,
      initialMinPrice,
      initialMaxPrice,
      initialSortBy,
      initialSortOrder,
    ],
    queryFn: () =>
      getRestaurantsByQuery(
        initialSearch,
        initialCuisine,
        initialMinPrice,
        initialMaxPrice,
        initialSortBy,
        initialSortOrder,
      ),
  });

  const handlePriceChange = (e, newPrice, activeThumb) => {
    if (newPrice[1] - newPrice[0] < 5) {
      if (activeThumb === 0) {
        const min = Math.min(newPrice[0], maxPrice - 5);
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

  const handleCuisineChange = (idx) => {
    setSelectedCuisine((prev) =>
      prev.includes(idx)
        ? prev.filter((item) => item !== idx)
        : [...prev, idx].sort((a, b) => a - b),
    );
  };

  const handleFilterReset = () => {
    setPrice([
      parseInt(initialMinPrice) || 0,
      parseInt(initialMaxPrice) || parseInt(initialMinPrice) + 5 || 5,
    ]);
    setSort(initialSortBy + "," + initialSortOrder);
    setSelectedCuisine(initialCuisine.split("c").map((item) => parseInt(item)));
  };

  const handleFilterSubmit = () => {
    navigate(
      "/search?search=" +
        initialSearch +
        "&cuisine=" +
        selectedCuisine.join("c") +
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

  useEffect(() => {
    handleFilterReset();
  }, [searchParams]);

  const isFilterEqualSearchParams =
    price[0] === (parseInt(initialMinPrice) || 0) &&
    price[1] ===
      (parseInt(initialMaxPrice) || parseInt(initialMinPrice) + 5 || 5) &&
    sort === initialSortBy + "," + initialSortOrder &&
    selectedCuisine.join("c") === initialCuisine;

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-10">
      <div className="text-2xl">
        Search results {initialSearch ? `for "${initialSearch}"` : ""}
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-10 rounded-3xl bg-neutral-100 px-10 pb-5 pt-10 sm:mx-5 lg:h-min lg:w-1/3">
          <div className="hidden text-2xl font-bold text-black lg:block">
            FILTERS
          </div>

          <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:items-start lg:flex-col">
            <SearchPrice
              max={maxPrice}
              price={price}
              handlePriceChange={handlePriceChange}
            />
            <SearchSort sort={sort} handleSortChange={handleSortChange} />
          </div>

          <SearchCuisine
            cuisines={cuisines}
            selectedCuisine={selectedCuisine}
            handleCuisineChange={handleCuisineChange}
          />

          <div className="flex items-center justify-center gap-5">
            <div
              className={
                isFilterEqualSearchParams
                  ? "rounded border border-neutral-300 px-3 py-2 font-medium text-neutral-300"
                  : "rounded border border-blue-900 px-3 py-2 font-medium text-blue-900 hover:cursor-pointer hover:bg-neutral-200"
              }
              onClick={handleFilterReset}
            >
              Reset
            </div>
            <div
              className={
                isFilterEqualSearchParams
                  ? "rounded bg-neutral-300 px-3 py-2 text-neutral-100"
                  : "rounded bg-blue-900 px-3 py-2 text-white hover:cursor-pointer hover:bg-blue-800"
              }
              onClick={handleFilterSubmit}
            >
              Apply
            </div>
          </div>
        </div>

        {isPending && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 lg:flex lg:w-2/3 lg:flex-col lg:items-start">
            {Array(9)
              .fill("a")
              .map((item, idx) => (
                <SearchSkeleton key={idx} />
              ))}
          </div>
        )}
        {isError && (
          <div>
            Error: {error?.message || "Failed to fetch restaurants by query"}
          </div>
        )}
        {!isPending && !isError && restaurants.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 lg:flex lg:w-2/3 lg:flex-col lg:items-start">
            {restaurants.map((restaurant) => (
              <SearchRestaurant
                key={restaurant._id}
                id={restaurant._id}
                name={restaurant.name}
                img={restaurant.img}
                cuisine={restaurant.cuisine}
                rating={restaurant.averageRating}
                review={restaurant.reviewCount}
                cuisines={cuisines}
                max={maxPrice}
              />
            ))}
          </div>
        )}
        {!isPending && !isError && restaurants.length === 0 && (
          <div className="m-5 flex flex-col items-center justify-center gap-5 lg:w-2/3 lg:justify-start">
            <LuFolderSearch size={80} />
            <div className="text-2xl">No matches found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
