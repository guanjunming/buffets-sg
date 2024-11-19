import { TiDelete } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";

const SearchCuisine = ({ cuisines, selectedCuisine, handleCuisineChange }) => {
  return (
    <div className="flex flex-col items-center gap-2 lg:items-start">
      <div className="text-xl">Cuisine</div>
      <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
        {cuisines.map((cuisine, idx) => (
          <div
            key={idx}
            className={
              selectedCuisine.includes(idx)
                ? "flex items-center justify-center gap-1 rounded-full border border-black bg-black px-3 py-1 text-sm text-white hover:cursor-pointer hover:bg-neutral-800"
                : "flex items-center justify-center gap-1 rounded-full border border-black px-3 py-1 text-sm text-black hover:cursor-pointer hover:bg-neutral-200"
            }
            onClick={() => handleCuisineChange(idx)}
          >
            <div>{cuisine}</div>
            {selectedCuisine.includes(idx) ? (
              <TiDelete />
            ) : (
              <IoIosAddCircleOutline />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchCuisine;
