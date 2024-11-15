import { useQuery } from "@tanstack/react-query";
import HomeTitle from "../components/home/HomeTitle";
import HomeFilter from "../components/home/HomeFilter";
import HomeSkeleton from "../components/home/HomeSkeleton";
import HomeRestaurant from "../components/home/HomeRestaurant";
import { getRestaurants } from "../api/api";

const Home = () => {
  const {
    data: restaurants = [],
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["restaurants"], queryFn: getRestaurants });

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-10">
      <HomeTitle />

      <HomeFilter />

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
  );
};

export default Home;
