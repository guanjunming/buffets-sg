import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

const HomeRestaurant = ({
  id,
  name,
  img,
  cuisine,
  rating,
  review,
  max,
  cuisines,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-500 hover:cursor-pointer hover:border-black hover:outline hover:outline-2">
      <Link to={"/restaurant/" + id}>
        <img
          src={img[0]}
          alt={name}
          className="mb-5 aspect-video w-full border-b border-neutral-500 object-cover"
          title={name}
        />
      </Link>

      <div className="mx-5 flex h-20 items-center justify-center overflow-hidden text-center text-xl font-bold">
        {name}
      </div>

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
          {review} Reviews
        </div>
      </div>

      <div className="m-5 flex flex-wrap items-center justify-center gap-2">
        {cuisine.map((cuisin, index) => (
          <span
            key={index}
            className="rounded-full bg-blue-800 px-3 py-1 text-sm font-semibold text-white"
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                "/search?search=&cuisine=" +
                  cuisines.indexOf(cuisin) +
                  "&minPrice=0&maxPrice=" +
                  max +
                  "&sortBy=name&sortOrder=asc",
              );
            }}
          >
            {cuisin}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HomeRestaurant;
