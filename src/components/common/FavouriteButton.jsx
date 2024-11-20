import { useAuth } from "../../context/AuthProvider";
import { useFavourites } from "../../context/FavouritesProvider";
import { useModal } from "../../context/ModalProvider";
import { GoHeart, GoHeartFill } from "react-icons/go";

const FavouriteButton = ({ restaurantId }) => {
  const { isLoggedIn } = useAuth();
  const { addFavourite, deleteFavourite, isFavourite, isPending } =
    useFavourites();
  const { openLoginModal } = useModal();

  const isFilled = isFavourite(restaurantId);

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
      className="flex rounded-full bg-white p-1.5 hover:bg-gray-100"
      onClick={handleClick}
    >
      <div className={`${isFilled ? "text-rose-500" : "text-gray-800"}`}>
        {isFilled ? <GoHeartFill /> : <GoHeart />}
      </div>
    </button>
  );
};

export default FavouriteButton;
