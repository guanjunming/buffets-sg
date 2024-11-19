import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "../api/api";
import { Rating } from "@mui/material";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useRef } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ReviewsSection from "../components/detail/ReviewsSection";

const Detail = () => {
  const { id } = useParams();
  const [isReadMore, setIsReadMore] = useState(false);
  const maxLength = 300;
  const reviewsRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const goToReviews = () => {
    reviewsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const {
    data: restaurant,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error {error.message}</div>;
  const shortenInfo = restaurant.description.slice(0, maxLength);

  return (
    <div className="m-auto mx-9 text-left">
      <div>
        <div className="mx-auto p-6">
          <div className="md:flex-column flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 pr-4">
              <h2 className="text-2xl font-bold">{restaurant.name}</h2>
              <div
                className="cursor-pointer text-2xl text-rose-500"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {hover ? <GoHeartFill /> : <GoHeart />}
              </div>
            </div>
            <div>
              {restaurant?.img?.length > 0 ? (
                <>
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#fff",
                      "--swiper-pagination-color": "#fff",
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    {restaurant.img.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className="thumbnailbg">
                          <img
                            src={img}
                            alt={`${restaurant.name} ${index + 1}`}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {restaurant.img.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className="thumbnail">
                          <img
                            src={img}
                            alt={`${restaurant.name} ${index + 1}`}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mx-auto p-6">
          <div className="flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:flex-row">
            <div className="flex-1 border-r border-gray-200 pr-4">
              <h2 className="mb-2 font-semibold">ABOUT</h2>

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

            <div className="flex-1">
              <h2 className="mb-2 font-semibold">DETAILS</h2>
              <div className="my-4 border-t border-gray-300">
                <div className="mt-4">
                  <strong>Opening Hours:</strong>
                </div>
                <br />
                {restaurant.openingHours.split("/").map((hour, index) => (
                  <p key={index}>{hour.trim()}</p>
                ))}
              </div>
              <div className="mt-4">
                <strong>Cuisine:</strong>
                <br />

                {restaurant.cuisine.map((cuisine, index) => (
                  <span
                    key={index}
                    className="mr-1 rounded-sm bg-blue-400 px-1 py-1 text-xs text-white"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <strong>Price Range:</strong> Adult: from $
                {restaurant.adultPrice?.min}{" "}
                {restaurant.adultPrice.max && ` - ${restaurant.adultPrice.max}`}
                ++
              </div>
              <div className="mt-4">
                <strong>Address:</strong>
                {restaurant.address}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:flex-row">
          <div className="flex-1 basis-1/4 border-r border-gray-200 p-4">
            <h2 className="mt-4 font-semibold">RATINGS</h2>
            <div className="my-4 border-t border-gray-300">
              <strong>
                <p className="text-text-base mt-8">{`${restaurant.averageRating}/5`}</p>
              </strong>
            </div>
            <div className="flex flex-col gap-1">
              <Rating
                value={restaurant.averageRating}
                precision={0.1}
                sx={{
                  color: "rgb(30,64,175)",
                  "& .MuiRating-icon": { color: "rgb(30,64,175)" },
                }}
                readOnly
              />
            </div>
            <br></br>
            <p>Based on {restaurant.reviewCount} reviews</p>

            <div className="relative h-20">
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

          <div className="flex-1 basis-3/4 p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-gray-200">
                <h2 className="font-semibold">REVIEWS</h2>
                <div className="mt-4 border-t border-gray-300"></div>
                <Link
                  to={`/review/${id}`}
                  className="rounded-md bg-blue-900 px-4 py-3 text-white hover:bg-blue-800"
                >
                  Write a review
                </Link>
              </div>

              <ReviewsSection id={id} reviews={restaurant.reviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
