import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LuFolderSearch } from "react-icons/lu";
import { getRestaurantsByNearest } from "../../api/api";
import HomeSkeleton from "./HomeSkeleton";
import HomeRestaurant from "./HomeRestaurant";

const HomeNearest = ({ maxPrice, cuisines }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [positionError, setPositionError] = useState(null);

  const {
    mutate,
    data: restaurants = [],
    isPending,
    isError: isPostError,
    error: postError,
  } = useMutation({
    mutationFn: (userLocation) => getRestaurantsByNearest(userLocation),
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setUserLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          }),
        (error) => setPositionError("Failed to get your location"),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );
    } else {
      setPositionError("Failed to use geolocation");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      mutate(userLocation);
    }
  }, [userLocation]);

  if (!userLocation)
    return <div>Please enable location permission to sort by nearest</div>;
  if (positionError) return <div>Error: {positionError}</div>;
  if (isPending)
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
        {Array(9)
          .fill("a")
          .map((item, idx) => (
            <HomeSkeleton key={idx} />
          ))}
      </div>
    );
  if (isPostError)
    return (
      <div>
        Error: {postError?.message || "Failed to fetch nearest restaurants"}
      </div>
    );

  if (!isPending && !isPostError && restaurants.length > 0)
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
        {restaurants.map((restaurant) => (
          <HomeRestaurant
            key={restaurant._id}
            id={restaurant._id}
            name={restaurant.name}
            img={restaurant.img}
            cuisine={restaurant.cuisine}
            rating={restaurant.averageRating}
            review={restaurant.reviewCount}
            cuisines={cuisines}
            max={maxPrice}
            distance={restaurant.distance}
          />
        ))}
      </div>
    );
  if (!isPending && !isPostError && restaurants.length === 0)
    return (
      <div className="m-5 flex flex-col items-center justify-center gap-5">
        <LuFolderSearch size={80} />
        <div className="text-2xl">No matches found</div>
      </div>
    );
};

export default HomeNearest;
