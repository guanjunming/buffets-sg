import { Rating } from "@mui/material";
import React from "react";
import { useState } from "react";
import RestaurantModal from "./RestaurantModal";

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
  rating,
  review,
}) => {
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);

  return (
    <div
      className="item-center flex h-full flex-col justify-between gap-5 overflow-hidden rounded-3xl border border-gray-400 pb-5 hover:cursor-pointer hover:border-white"
      onClick={() => {
        setShowRestaurantModal(true);
      }}
    >
      <img
        src={img}
        alt={name}
        className="aspect-video border-b border-gray-400 object-cover hover:brightness-125"
      />
      <div>
        <div className="text-2xl font-bold">{name}</div>

        <div className="flex flex-col items-center justify-center gap-1 lg:flex-row">
          <Rating
            defaultValue={rating}
            precision={0.1}
            sx={{ color: "blue", "& .MuiRating-icon": { color: "blue" } }}
            readOnly
          />
          <div>
            <span className="font-medium">{rating} </span>({review} Reviews)
          </div>
        </div>

        <div className="text-gray-400">{description}</div>
      </div>
      <div>
        {showRestaurantModal && (
          <RestaurantModal
            id={id}
            name={name}
            img={img}
            address={address}
            time={time}
            adultPrice={adultPrice}
            childPrice={childPrice}
            description={description}
            cuisine={cuisine}
            website={website}
            rating={rating}
            review={review}
            setShowRestaurantModal={setShowRestaurantModal}
          />
        )}
      </div>
    </div>
  );
};

export default HomeRestaurant;
