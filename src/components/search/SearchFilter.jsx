import { Slider } from "@mui/material";

const SearchFilter = ({ max, price, handleSliderChange }) => {
  return (
    <div className="flex flex-col items-center gap-5 lg:flex-row">
      <div className="text-xl">Price Range :</div>

      <Slider
        min={0}
        max={max}
        value={price}
        onChange={handleSliderChange}
        valueLabelDisplay="on"
        disableSwap
        sx={{
          width: 250,
          color: "black",
          "& .MuiSlider-thumb": {
            width: 5,
            height: 20,
            borderRadius: "0px",
          },
          "& .MuiSlider-rail": { height: 10, borderRadius: "0px" },
          "& .MuiSlider-track": { height: 10 },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "transparent",
            color: "black",
            fontSize: 16,
            margin: 2,
          },
        }}
        marks={[
          { value: 0, label: "$0" },
          { value: max, label: "$" + max },
        ]}
        valueLabelFormat={(v, i) =>
          i === 0 ? `$${v} ${" ".repeat(5)}` : `${" ".repeat(5)} $${v}`
        }
      />
    </div>
  );
};

export default SearchFilter;
