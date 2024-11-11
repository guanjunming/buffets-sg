import { useState } from "react";
import HomeTitle from "./HomeTitle";
import HomeSearch from "./HomeSearch";
import HomeFilter from "./HomeFilter";
import HomeSkeleton from "./HomeSkeleton";
import HomeRestaurant from "./HomeRestaurant";
import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../../api/api";

const Home = () => {
  const {
    data: restaurants = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });

  const [search, setSearch] = useState("");

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <>
      <div className="flex flex-col gap-5 p-10">
        <HomeTitle />

        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row-reverse lg:items-center">
          <HomeSearch
            search={search}
            handleSearch={handleSearch}
            names={restaurants.map((restaurant) => restaurant.name)}
          />
          <HomeFilter />
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {Array(4)
              .fill("a")
              .map((item, idx) => (
                <HomeSkeleton key={idx} />
              ))}
          </div>
        )}

        {isError && (
          <div>Error: {error.message || "Failed to fetch restaurants"}</div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {restaurants
              .filter((restaurant) =>
                restaurant.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((restaurant, idx) => (
                <HomeRestaurant
                  key={idx}
                  id={restaurant._id}
                  name={restaurant.name}
                  img={restaurant.img}
                  address={restaurant.address}
                  openingHours={restaurant.openingHours}
                  adultPrice={restaurant.adultPrice}
                  childPrice={restaurant.childPrice}
                  description={restaurant.description}
                  cuisine={restaurant.cuisine}
                  website={restaurant.website}
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

export default Home;
