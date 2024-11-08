import HomeTitle from "./HomeTitle";
import HomeSearch from "./HomeSearch";
import HomeFilter from "./HomeFilter";
import HomeRestaurant from "./HomeRestaurant";
import { restaurants } from "../../data/restaurants.js";

const Home = () => {
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
              img={restaurant.img}
              name={restaurant.name}
              rating={restaurant.rating}
              review={restaurant.review}
              description={restaurant.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
