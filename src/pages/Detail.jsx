import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "../api/api";
import { Rating } from "@mui/material";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useRef } from "react";

const Detail = () => {
  const { id } = useParams();
  const rating = Math.floor(Math.random() * 50) / 10;
  const [isReadMore, setIsReadMore] = useState(false);
  const maxLength = 300;
  const reviewsRef = useRef(null);

  const goToReviews = () => {
    reviewsRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
  const shortenInfo = restaurant.description.slice(0, maxLength);

  return (
    <div className="m-auto mx-9 max-w-screen-xl text-left">
      <h2 className="mb-4 text-center text-2xl font-bold">{restaurant.name}</h2>
      <div className="my-2.5 flex items-center justify-center">
        <img
          src={restaurant.img}
          alt={restaurant.name}
          className="aspect-video h-auto w-2/3 border-b border-gray-400 object-cover"
        />
      </div>
      <div className="text-sm-custom">
        <div className="mx-auto max-w-4xl p-6">
          <div className="flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:flex-row">
            <div className="flex-1 border-r border-gray-200 pr-4">
              <h2 className="text-sm-custom mb-2 font-semibold">ABOUT</h2>

              <div className="my-4 mb-2 border-t border-gray-300 leading-relaxed">
                <p className="mt-4">
                  {isReadMore ? restaurant.description : shortenInfo}
                  {restaurant.description.length > maxLength && (
                    <button
                      className="ml-0 inline-flex items-center space-x-2 text-blue-500 hover:text-blue-700"
                      onClick={() => setIsReadMore(!isReadMore)}
                    >
                      <span>{isReadMore ? "Read less" : "Read more"}</span>
                      {isReadMore ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </button>
                  )}
                </p>
              </div>
            </div>

            <div className="flex-1 border-r border-gray-200 px-4">
              <h2 className="text-sm-custom mb-2 font-semibold">DETAILS</h2>
              <div className="my-4 border-t border-gray-300">
                <div className="mt-4">
                  <strong>Opening Hours:</strong>
                </div>
                <br />
                {restaurant.openingHours.split("/").map((hour, index) => (
                  <p key={index}>{hour.trim()}</p> // Trim whitespace before rendering
                ))}
              </div>
              <div className="mt-4">
                <strong>Cuisine:</strong>
                <br />

                {restaurant.cuisine.map((cuisine, index) => (
                  <span
                    key={index}
                    className="text-sm-custom2 mr-1 rounded-sm bg-blue-400 px-1 py-1 text-white"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
              <p className="mt-4">
                <strong>Price Range:</strong> Adult: from $
                {restaurant.adultPrice?.min}{" "}
                {restaurant.adultPrice.max && ` - ${restaurant.adultPrice.max}`}
                ++
              </p>
            </div>

            <div className="flex-1 pl-4">
              <h2 className="text-sm-custom mb-2 font-semibold">
                RATINGS & REVIEWS
              </h2>
              <div className="my-4 border-t border-gray-300">
                <strong>
                  <p className="text-2xl-custom mt-4">4.5/5</p>
                </strong>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <Rating
                  value={rating}
                  precision={0.1}
                  sx={{
                    color: "rgb(30,64,175)",
                    "& .MuiRating-icon": { color: "rgb(30,64,175)" },
                  }}
                  readOnly
                />
              </div>
              <p className="mt-4">
                Based on{" "}
                <button
                  onClick={goToReviews} // Scroll to the reviews section on click
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  120 reviews
                </button>
              </p>
              <div className="relative h-40">
                <a
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-0 mb-4 mr-4 text-blue-500 hover:text-blue-700"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm-custom">
          <div className="mx-auto max-w-4xl p-6">
            <div className="md:flex-column flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div
                ref={reviewsRef}
                className="flex-1 border-b border-gray-200 pb-4 pr-4"
              >
                <h2 className="text-sm-custom mb-2 font-semibold">REVIEWS</h2>
              </div>

              <div className="flex-1 border-b border-gray-200 pb-4 pr-4">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold">
                    <CgProfile />
                    <p>Jane</p>
                  </div>
                  <div className="flex items-center">
                    <Rating
                      value={rating}
                      precision={0.1}
                      sx={{
                        color: "rgb(30,64,175)",
                        "& .MuiRating-icon": { color: "rgb(30,64,175)" },
                      }}
                      readOnly
                    />
                  </div>
                </div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis commodi est asperiores deleniti magni provident illum
                cum eius, iste incidunt numquam aut necessitatibus libero
                expedita recusandae maxime laboriosam soluta adipisci.
              </div>

              <div className="flex-1 border-b border-gray-200 pb-4 pr-4">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold">
                    <CgProfile />
                    <p>Clifford</p>
                  </div>
                  <div className="flex items-center">
                    <Rating
                      value={rating}
                      precision={0.1}
                      sx={{
                        color: "rgb(30,64,175)",
                        "& .MuiRating-icon": { color: "rgb(30,64,175)" },
                      }}
                      readOnly
                    />
                  </div>
                </div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reercitationem iure vero! adipisci possimus blanditiis eligendi!
                Ips viksdnvs fesfa.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
