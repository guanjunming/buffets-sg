import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const SearchRestaurant = ({
  id,
  name,
  img,
  cuisine,
  rating,
  review,
  cuisines,
  max,
}) => {
  return (
    <div className="flex h-full flex-col gap-0 rounded-3xl border-y border-l border-r border-neutral-500 p-0 lg:h-auto lg:flex-row lg:items-center lg:justify-start lg:gap-5 lg:rounded-none lg:border-y-0 lg:border-r-0 lg:p-2">
      <Link to={"/restaurant/" + id} className="lg:w-1/2">
        <img
          src={img[0]}
          alt={name}
          className="mb-5 aspect-video w-full rounded-t-3xl border-b border-neutral-500 object-cover hover:cursor-pointer hover:border-black hover:outline hover:outline-2 hover:brightness-110 lg:mb-0 lg:rounded-3xl lg:border"
          title={name}
        />
      </Link>

      <div className="flex flex-col items-center justify-center lg:w-1/2 lg:items-start">
        <Link to={"/restaurant/" + id}>
          <div className="mx-5 flex h-20 items-center justify-center overflow-hidden text-center text-xl font-bold text-black hover:text-neutral-800 lg:mx-0 lg:text-left hover:lg:underline">
            {name}
          </div>
        </Link>

        <div className="mx-5 flex flex-col items-center justify-center gap-1 lg:mx-0 lg:flex-row">
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
            {review} Reviews
          </div>
        </div>

        <div className="mx-5 my-5 flex flex-wrap items-center justify-center gap-2 lg:mx-0 lg:justify-start">
          {cuisine.map((cuisin, idx) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchRestaurant;
