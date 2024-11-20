import { Skeleton } from "@mui/material";

const HomeSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-500">
      <Skeleton
        variant="rectangular"
        className="mb-4 border-b border-neutral-500 pt-[56.25%]"
      />

      <Skeleton variant="rectangular" height={56} className="mx-5 mb-3" />

      <Skeleton variant="rectangular" height={50} className="mx-28" />

      <Skeleton variant="rectangular" height={28} className="m-5 mx-16" />
    </div>
  );
};

export default HomeSkeleton;
