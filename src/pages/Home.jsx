import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LuFolderSearch } from "react-icons/lu";
import HomeTitle from "../components/home/HomeTitle";
import HomeFilter from "../components/home/HomeFilter";
import HomeSkeleton from "../components/home/HomeSkeleton";
import HomeRestaurant from "../components/home/HomeRestaurant";
import HomeNearest from "../components/home/HomeNearest";
import { getRestaurantsMaxPriceCuisines, getRestaurants } from "../api/api";

const Home = () => {
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
  } = useQuery({ queryKey: ["restaurants"], queryFn: getRestaurants });

  const [tab, setTab] = useState({ all: true });
  const sortBy = (key) => setTab({ [key]: true });

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-10">
      <HomeTitle
        restaurants={restaurants}
        isPending={isPending}
        isError={isError}
      />

      <HomeFilter tab={tab} sortBy={sortBy} />

      {!tab?.nearest && isPending && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {Array(9)
            .fill("a")
            .map((item, idx) => (
              <HomeSkeleton key={idx} />
            ))}
        </div>
      )}

      {!tab?.nearest && isError && (
        <div>Error: {error?.message || "Failed to fetch restaurants"}</div>
      )}

      {!tab?.nearest && !isPending && !isError && restaurants.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {[...restaurants]
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort(
              (a, b) =>
                (tab?.rating && b.averageRating - a.averageRating) ||
                (tab?.review && b.reviewCount - a.reviewCount),
            )
            .map((restaurant) => (
              <HomeRestaurant
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
      {!tab?.nearest && !isPending && !isError && restaurants.length === 0 && (
        <div className="m-5 flex flex-col items-center justify-center gap-5">
          <LuFolderSearch size={80} />
          <div className="text-2xl">No matches found</div>
        </div>
      )}

      {tab?.nearest && <HomeNearest maxPrice={maxPrice} cuisines={cuisines} />}
    </div>
  );
};

export default Home;
