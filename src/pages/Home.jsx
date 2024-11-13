import { useQuery } from "@tanstack/react-query";
import HomeTitle from "../components/home/HomeTitle";
import HomeFilter from "../components/home/HomeFilter";
import HomeSkeleton from "../components/home/HomeSkeleton";
import HomeRestaurant from "../components/home/HomeRestaurant";
import { getRestaurants } from "../api/api";

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

  return (
    <>
      <div className="flex flex-col gap-5 p-5 sm:p-10">
        <HomeTitle />

        <HomeFilter />

        {isLoading && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
            {Array(9)
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
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
            {restaurants.map((restaurant, idx) => (
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
