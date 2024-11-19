import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavourites, getAllFavourites, removeFavourite } from "../api/api";
import { useAuth } from "./AuthProvider";
import { useModal } from "./ModalProvider";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const { user, isLoggedIn, isInitialized } = useAuth();
  const queryClient = useQueryClient();
  const { openLoginModal } = useModal();

  const { data: favourites } = useQuery({
    queryKey: ["favourites", user?.id],
    queryFn: () => getAllFavourites(user.id),
    enabled: isInitialized && !!user && isLoggedIn,
  });

  const {
    mutate: addFavouriteMutate,
    isPending: isAddPending,
    isError: isAddError,
    error: addError,
  } = useMutation({
    mutationFn: addToFavourites,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favourites", user.id],
      });
    },
    onError: (error) => {
      if (error.response.status === 401) {
        openLoginModal();
      }
    },
  });

  const addFavorite = (restaurantId) => {
    if (isLoggedIn && !isFavorite(restaurantId)) {
      addFavouriteMutate(restaurantId);
    }
  };

  const {
    mutate: deleteFavoriteMutate,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: removeFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favourites", user.id],
      });
    },
    onError: (error) => {
      if (error.response.status === 401) {
        openLoginModal();
      }
    },
  });

  const deleteFavourite = (restaurantId) => {
    if (isLoggedIn) {
      deleteFavoriteMutate(restaurantId);
    }
  };

  const isFavorite = (restaurantId) => {
    if (favourites) {
      return favourites.some((fav) => fav._id === restaurantId);
    }
    return false;
  };

  const value = {
    favourites,
    addFavorite,
    deleteFavourite,
    isFavorite,
    isPending: isAddPending || isDeletePending,
    isError: isAddError || isDeleteError,
    error: addError || deleteError,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  return useContext(FavouritesContext);
};
