import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantsByQuery } from "../api/api";

const Search = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams?.get("search") || "";
  const minPrice = searchParams?.get("minPrice") || "";
  const maxPrice = searchParams?.get("maxPrice") || "";
  const sortBy = searchParams?.get("sortBy") || "name";
  const sortOrder = searchParams?.get("sortOrder") || "asc";

  const {
    data: restaurants = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["restaurants", search, minPrice, maxPrice, sortBy, sortOrder],
    queryFn: () =>
      getRestaurantsByQuery(search, minPrice, maxPrice, sortBy, sortOrder),
  });

  return (
    <>
      <div className="font-bold">Content in progress</div>
      <div>search : {search}</div>
      <div>minPrice : {minPrice}</div>
      <div>maxPrice : {maxPrice}</div>
      <div>sortBy : {sortBy}</div>
      <div className="mb-10">sortOrder : {sortOrder}</div>
      <div>
        {restaurants.map((restaurant) => (
          <Link key={restaurant._id} to={"/restaurant/" + restaurant._id}>
            <img
              src={restaurant.img}
              alt={restaurant.name}
              className="w-52"
              title={restaurant.name}
            />
            <div className="mb-10">{restaurant.name}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Search;
