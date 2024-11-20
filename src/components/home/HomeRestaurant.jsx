import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import FavouriteButton from "../common/FavouriteButton";
import { IconContext } from "react-icons";

const HomeRestaurant = ({
  id,
  name,
  img,
  cuisine,
  rating,
  review,
  cuisines,
  max,
  distance,
}) => {
  return (
    <div className="relative flex h-full flex-col rounded-3xl border border-neutral-500">
      <Link to={"/restaurant/" + id}>
        <img
          src={img[0]}
          alt={name}
          className="mb-5 aspect-video w-full rounded-t-3xl border-b border-neutral-500 object-cover hover:cursor-pointer hover:border-black hover:brightness-110"
          title={name}
        />
      </Link>

      <div className="absolute right-2.5 top-2.5">
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <FavouriteButton restaurantId={id} />
        </IconContext.Provider>
      </div>

      <Link to={"/restaurant/" + id}>
        <div className="mx-5 flex h-20 items-center justify-center overflow-hidden text-center text-xl font-bold text-black hover:text-neutral-800">
          {name}
        </div>
      </Link>

      <div className="mx-5 flex flex-col items-center justify-center gap-1">
        <Rating
          value={rating}
          precision={0.1}
          sx={{
            zIndex: -1,
            color: "rgb(30,64,175)",
            "& .MuiRating-icon": { color: "rgb(30,64,175)" },
          }}
          readOnly
        />
        <div>
          <span className="font-semibold">({rating}) </span>
          {review} Review{review > 1 ? "s" : ""}
        </div>
      </div>

      <div className="m-5 flex flex-wrap items-center justify-center gap-2">
        {cuisine.map((cuisin, idx) => {
          if (cuisines && max) {
            return (
              <Link
                key={idx}
                to={
                  "/search?search=&cuisine=" +
                  cuisines.indexOf(cuisin) +
                  "&minPrice=0&maxPrice=" +
                  max +
                  "&sortBy=name&sortOrder=asc"
                }
                className="rounded-full bg-blue-900 px-3 py-1 text-sm font-semibold text-white hover:cursor-pointer hover:bg-blue-800"
              >
                {cuisin}
              </Link>
            );
          } else {
            return (
              <div
                key={idx}
                className="rounded-full bg-blue-900 px-3 py-1 text-sm font-semibold text-white"
              >
                {cuisin}
              </div>
            );
          }
        })}
      </div>

      {!!distance && (
        <div className="mb-5 flex items-center justify-center text-center font-medium">
          ({Math.floor(distance / 100) / 10} km away)
        </div>
      )}
    </div>
  );
};

export default HomeRestaurant;
