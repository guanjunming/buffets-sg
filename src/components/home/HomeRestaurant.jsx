import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

const HomeRestaurant = ({
  id,
  name,
  img,
  address,
  time,
  adultPrice,
  childPrice,
  description,
  cuisine,
  website,
  rating = Math.floor(Math.random() * 50) / 10,
  review = Math.floor(Math.random() * 200),
}) => {
  const navigate = useNavigate();

  const handleRestaurantClick = () => {
    navigate(`/restaurant/${id}`, {
      state: {
        id,
        name,
        img,
        address,
        time,
        adultPrice,
        childPrice,
        description,
        cuisine,
        website,
        rating,
        review,
      },
    });
  };

  return (
    <div
      className="overflow-hidden rounded-3xl border border-gray-400 hover:cursor-pointer hover:border-white hover:outline hover:outline-4"
      onClick={handleRestaurantClick}
    >
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

      <div className="m-5 line-clamp-2 text-justify text-gray-400 lg:line-clamp-5">
        {description}
      </div>
    </div>
  );
};

export default HomeRestaurant;
