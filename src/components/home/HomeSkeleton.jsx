import { Skeleton } from "@mui/material";

const HomeSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-500">
      <Skeleton
        variant="rectangular"
        className="mb-5 border-b border-neutral-500 pt-[56.25%]"
      />

      <Skeleton variant="rectangular" height={56} className="mx-5 mb-5" />

      <Skeleton variant="rectangular" height={28} className="mx-16" />

      <Skeleton variant="rectangular" height={28} className="m-5 mx-8" />
    </div>
  );
};

export default HomeSkeleton;
