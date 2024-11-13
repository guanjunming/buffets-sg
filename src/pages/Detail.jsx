import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "../api/api";

const Detail = () => {
  const { id } = useParams();

  const {
    data: restaurant,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error {error.message}</div>;

  return (
    <div className="mx-9 text-left">
      <h2 className="mb-4 text-2xl font-bold">{restaurant.name}</h2>
      <div className="my-2.5 flex items-center justify-center">
        <img
          src={restaurant.img}
          alt={restaurant.name}
          className="aspect-video h-auto w-2/3 border-b border-gray-400 object-cover"
        />
      </div>

      <p>{restaurant.description}</p>
      <br></br>
      <p>Address: {restaurant.address}</p>
      <br></br>
      <p>Opening Hours: {restaurant.time}</p>
      <br></br>
      <p>Cuisine: {restaurant.cuisine}</p>
      <br></br>
      <p>Price:</p>
      <p>
        Adult: from ${restaurant.adultPrice?.min}{" "}
        {restaurant.adultPrice.max && ` - ${restaurant.adultPrice.max}`}++
      </p>
      {restaurant.childPrice && (
        <p>
          Child: from ${restaurant.childPrice.min}{" "}
          {restaurant.childPrice.max && ` - ${restaurant.childPrice.max}`}++
        </p>
      )}
      <br />
      <p>Rating: </p>
      <br></br>
      <p>Reviews: </p>
      <br></br>
      <p>Give a rating:</p>
      {/* star rating */}
      <p>Leave a review:</p>
      {/* input box to post comments */}

      <a
        href={restaurant.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        Visit Website
      </a>
    </div>
  );
};

export default Detail;
