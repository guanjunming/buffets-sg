import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavourites, getAllFavourites, removeFavourite } from "../api/api";
import { useAuth } from "./AuthProvider";
import { useModal } from "./ModalProvider";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const { user, isInitialized } = useAuth();
  const queryClient = useQueryClient();
  const { openLoginModal } = useModal();

  const { data: favourites } = useQuery({
    queryKey: ["favourites", user?.id],
    queryFn: getAllFavourites,
    enabled: isInitialized && !!user,
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

  const addFavourite = (restaurantId) => {
    if (user && !isFavourite(restaurantId)) {
      addFavouriteMutate(restaurantId);
    }
  };

  const {
    mutate: deleteFavouriteMutate,
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
    if (user) {
      deleteFavouriteMutate(restaurantId);
    }
  };

  const isFavourite = (restaurantId) => {
    if (favourites) {
      return favourites.some((fav) => fav._id === restaurantId);
    }
    return false;
  };

  const value = {
    favourites,
    addFavourite,
    deleteFavourite,
    isFavourite,
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
