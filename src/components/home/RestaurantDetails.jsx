import React from "react";
import { useLocation } from "react-router-dom";

const RestaurantDetails = () => {
  const location = useLocation();
  const { state } = location;

  const {
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
  } = state || {};

  return (
    <div className="mx-9 text-left">
      <h2 className="mb-4 text-2xl font-bold">{name}</h2>
      <div className="my-2.5 flex items-center justify-center">
        <img
          src={img}
          alt={name}
          className="aspect-video h-auto w-2/3 border-b border-gray-400 object-cover"
        />
      </div>

      <p>{description}</p>
      <br></br>
      <p>Address: {address}</p>
      <br></br>
      <p>Opening Hours: {time}</p>
      <br></br>
      <p>Cuisine: {cuisine}</p>
      <br></br>
      <p>Price:</p>
      <p>Adult : {adultPrice}</p>
      {childPrice && <p>Child: {childPrice}</p>}
      <br></br>
      <p>Rating: {rating}</p>
      <br></br>
      <p>Reviews: {review}</p>
      <br></br>
      <p>Give a rating:</p>
      {/* star rating */}
      <p>Leave a review:</p>
      {/* input box to post comments */}

      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        Visit Website
      </a>
    </div>
  );
};

export default RestaurantDetails;
