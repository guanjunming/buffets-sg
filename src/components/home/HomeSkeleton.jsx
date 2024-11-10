import { Skeleton } from "@mui/material";

const HomeSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-400">
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        className="mb-5 border-b border-gray-400 pt-[56.25%]"
      />

      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        height={56}
        className="mx-5 mb-5"
      />

      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        className="mx-24"
      />

      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        height={120}
        className="m-5"
      />
    </div>
  );
};

export default HomeSkeleton;
