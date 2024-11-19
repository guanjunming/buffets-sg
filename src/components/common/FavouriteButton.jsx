import { useAuth } from "../../context/AuthProvider";
import { useFavourites } from "../../context/FavouritesProvider";
import { useModal } from "../../context/ModalProvider";
import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

const FavouriteButton = ({ restaurantId }) => {
  const [hover, setHover] = useState(false);
  const { isLoggedIn } = useAuth();
  const { addFavourite, deleteFavourite, isFavourite, isPending } =
    useFavourites();
  const { openLoginModal } = useModal();

  const isFilled = hover || isFavourite(restaurantId);

  const handleClick = () => {
    if (isLoggedIn) {
      if (isFavourite(restaurantId)) {
        deleteFavourite(restaurantId);
      } else {
        addFavourite(restaurantId);
      }
    } else {
      openLoginModal();
    }
  };

  return (
    <button
      disabled={isPending}
      className={`text-2xl ${isFilled ? "text-rose-500" : "text-gray-950"}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {isFilled ? <GoHeartFill /> : <GoHeart />}
    </button>
  );
};

export default FavouriteButton;
