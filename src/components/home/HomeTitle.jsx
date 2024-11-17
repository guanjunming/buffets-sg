import { Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const HomeTitle = ({ restaurants, isPending, isError }) => {
  return (
    <div className="mb-5 flex flex-col-reverse items-center justify-center gap-2 sm:mb-10 sm:flex-row sm:gap-8 lg:gap-16">
      <div>
        <div className="text-center text-2xl sm:text-left">
          Find your favourite buffets
        </div>
        <div className="text-center sm:my-2 sm:text-left">
          Search for places you love
        </div>
      </div>

      <div className="w-3/4 sm:w-3/5">
        {isPending && (
          <Skeleton variant="rectangular" className="m-auto w-4/5 pt-[45%]" />
        )}
        {!isPending && !isError && restaurants.length > 0 && (
          <Swiper
            effect={"cards"}
            modules={[EffectCards, Autoplay]}
            slidesPerView={1.2}
            centeredSlides={true}
            autoplay={{ delay: 0 }}
            allowTouchMove={false}
            speed={2500}
          >
            {restaurants.map((restaurant) => (
              <SwiperSlide key={restaurant._id}>
                <img
                  src={restaurant.img[0]}
                  alt={restaurant.name}
                  title={restaurant.name}
                  className="aspect-video w-full object-cover duration-500 hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default HomeTitle;
