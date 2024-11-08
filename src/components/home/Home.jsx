import HomeTitle from "./HomeTitle";
import HomeSearch from "./HomeSearch";
import HomeFilter from "./HomeFilter";
import HomeRestaurant from "./HomeRestaurant";
import useFetchRestaurants from "../../data/useFetchRestaurants.js";

const Home = () => {
  const { restaurants, loading, error } = useFetchRestaurants();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-5 p-10">
        <HomeTitle />

        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row-reverse lg:items-center">
          <HomeSearch />
          <HomeFilter />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {restaurants.map((restaurant, idx) => (
            <HomeRestaurant
              key={idx}
              id={restaurant._id}
              name={restaurant.restaurant_name}
              img={restaurant.img}
              address={restaurant.address}
              time={restaurant.opening_hours}
              adultPrice={restaurant.price_range_adult}
              childPrice={restaurant.price_range_child}
              description={restaurant.description}
              cuisine={restaurant.cuisine}
              website={restaurant.website}
              rating={restaurant.rating} //to add
              review={restaurant.review} //to add
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
