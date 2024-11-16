import { TiDelete } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";

const SearchCuisine = ({ cuisines, selectedCuisine, handleCuisineChange }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xl">Cuisine :</div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {cuisines.map((cuisine, idx) =>
          selectedCuisine.includes(idx) ? (
            <div
              key={idx}
              className="flex items-center justify-center gap-1 rounded-full border border-black bg-black px-3 py-1 text-sm text-white hover:cursor-pointer hover:bg-neutral-800"
              onClick={() => handleCuisineChange(idx)}
            >
              <div>{cuisine}</div>
              <TiDelete />
            </div>
          ) : (
            <div
              key={idx}
              className="flex items-center justify-center gap-1 rounded-full border border-black px-3 py-1 text-sm text-black hover:cursor-pointer hover:bg-neutral-200"
              onClick={() => handleCuisineChange(idx)}
            >
              <div>{cuisine}</div>
              <IoIosAddCircleOutline />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default SearchCuisine;
