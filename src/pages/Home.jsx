import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LuFolderSearch } from "react-icons/lu";
import HomeTitle from "../components/home/HomeTitle";
import HomeFilter from "../components/home/HomeFilter";
import HomeSkeleton from "../components/home/HomeSkeleton";
import HomeRestaurant from "../components/home/HomeRestaurant";
import {
  getRestaurantsMaxPrice,
  getRestaurantsCuisines,
  getRestaurants,
} from "../api/api";

const Home = () => {
  const query = useQuery({
    queryKey: ["restaurantsMaxPrice"],
    queryFn: getRestaurantsMaxPrice,
    initialData: [{ maxPrice: 5 }],
  });

  const { data: cuisines = [] } = useQuery({
    queryKey: ["restaurantsCuisines"],
    queryFn: getRestaurantsCuisines,
  });

  const {
    data: restaurants = [],
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["restaurants"], queryFn: getRestaurants });

  const [isAll, setIsAll] = useState(true);
  const [isRating, setIsRating] = useState(false);
  const [isReview, setIsReview] = useState(false);

  const sortByAlphabet = () => {
    setIsAll(true);
    setIsRating(false);
    setIsReview(false);
  };

  const sortByHighestRatings = () => {
    setIsAll(false);
    setIsRating(true);
    setIsReview(false);
  };

  const sortByMostReviewed = () => {
    setIsAll(false);
    setIsRating(false);
    setIsReview(true);
  };

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-10">
      <HomeTitle
        restaurants={restaurants}
        isPending={isPending}
        isError={isError}
      />

      <HomeFilter
        isAll={isAll}
        sortByAlphabet={sortByAlphabet}
        isRating={isRating}
        sortByHighestRatings={sortByHighestRatings}
        isReview={isReview}
        sortByMostReviewed={sortByMostReviewed}
      />

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

      {!isPending && !isError && restaurants.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {restaurants
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort(
              (a, b) =>
                (isRating && b.averageRating - a.averageRating) ||
                (isReview && b.reviewCount - a.reviewCount),
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
                max={query.data[0].maxPrice}
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

export default Home;
