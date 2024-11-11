import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const HomeRestaurant = ({
  id,
  name,
  img,
  cuisine,
  rating = Math.floor(Math.random() * 50) / 10,
  review = Math.floor(Math.random() * 200),
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-400 hover:cursor-pointer hover:border-white hover:outline hover:outline-4">
        <img
          src={img}
          alt={name}
          className="mb-5 aspect-video w-full border-b border-gray-400 object-cover"
          title={name}
        />

        <div className="mx-5 flex h-20 items-center justify-center overflow-hidden font-semibold lg:text-xl lg:font-bold">
          {name}
        </div>

        <div className="flex flex-col items-center justify-center gap-1 lg:flex-row">
          <Rating
            value={rating}
            precision={0.1}
            sx={{ color: "blue", "& .MuiRating-icon": { color: "blue" } }}
            readOnly
          />
          <div>
            <span className="font-medium">{rating} </span>({review} Reviews)
          </div>
        </div>

        <div className="m-5 line-clamp-2 text-justify text-gray-400">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {cuisine.map((cuisine, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white"
              >
                {cuisine}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeRestaurant;
