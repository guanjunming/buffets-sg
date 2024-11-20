import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useFavourites } from "../../context/FavouritesProvider";
import HomeRestaurant from "../home/HomeRestaurant";

const FavouritesPanel = () => {
  const PAGE_SIZE = 10;
  const [cardCount, setCardCount] = useState(PAGE_SIZE);
  const { favourites } = useFavourites();

  const handleShowMore = () => {
    setCardCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="w-full">
      {favourites && favourites.length > 0 ? (
        <div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {favourites.slice(0, cardCount).map((restaurant) => (
              <HomeRestaurant
                key={restaurant._id}
                id={restaurant._id}
                name={restaurant.name}
                img={restaurant.img}
                cuisine={restaurant.cuisine}
                rating={restaurant.averageRating}
                review={restaurant.reviewCount}
              />
            ))}
          </div>
          {cardCount < favourites.length && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleShowMore}
                className="rounded-lg bg-blue-900 px-4 py-3 text-white hover:bg-blue-800"
              >
                <div className="flex items-center gap-1">
                  <span>Show more</span>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-4/5 rounded border border-gray-200 p-6">
          <div className="m-auto max-w-[550px] p-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h3 className="text-xl font-bold">No favourites yet!</h3>
              <p className="text-gray-600">
                Start exploring and bookmark the restaurants you love. Your list
                of favourites will appear here for quick access!
              </p>
              <Link
                to="/"
                className="rounded-md bg-blue-900 px-4 py-3 text-white hover:bg-blue-800"
              >
                Find Restaurants
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesPanel;
