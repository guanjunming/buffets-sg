import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantsByQuery } from "../api/api";
import HomeRestaurant from "../components/home/HomeRestaurant";
import HomeSkeleton from "../components/home/HomeSkeleton";
import { Slider } from "@mui/material";

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams?.get("search") || "";
  const initialMinPrice = searchParams?.get("minPrice") || "";
  const initialMaxPrice = searchParams?.get("maxPrice") || "";
  const initialSortBy = searchParams?.get("sortBy") || "name";
  const initialSortOrder = searchParams?.get("sortOrder") || "asc";
  const [newMinPrice, setNewMinPrice] = useState(parseInt(initialMinPrice));
  const [newMaxPrice, setNewMaxPrice] = useState(parseInt(initialMaxPrice));

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

  return (
    <>
      <div>initialMinPrice : {initialMinPrice}</div>
      <div>initialMaxPrice : {initialMaxPrice}</div>
      <div>initialSortBy : {initialSortBy}</div>
      <div className="mb-10">initialSortOrder : {initialSortOrder}</div>

      <div className="flex flex-col gap-5 p-5 sm:p-10">
        <div className="text-center text-2xl">
          Search results for: {initialSearch}
        </div>
        <Slider
          value={[newMinPrice, newMaxPrice]}
          onChange={(e) => {
            setNewMinPrice(e.target.value[0]);
            setNewMaxPrice(e.target.value[1]);
          }}
          valueLabelDisplay="auto"
        />
        {newMinPrice} , {newMaxPrice}
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
          <div>Error: {error?.message || "Failed to fetch restaurants"}</div>
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
      </div>
    </>
  );
};

export default Search;
