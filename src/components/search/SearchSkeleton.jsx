import { Skeleton } from "@mui/material";

const SearchSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-500 p-0 lg:flex lg:h-auto lg:w-full lg:flex-row lg:items-center lg:justify-start lg:gap-5 lg:rounded-none lg:border-0 lg:bg-neutral-100 lg:p-2">
      <Skeleton
        variant="rectangular"
        className="mb-8 border-b border-neutral-500 pt-[56.25%] lg:mb-0 lg:w-1/2 lg:rounded-3xl lg:border lg:pt-[28.125%]"
      />

      <div className="lg:hidden">
        <Skeleton variant="rectangular" height={56} className="mx-5 mb-3" />

        <Skeleton variant="rectangular" height={50} className="mx-28" />

        <Skeleton variant="rectangular" height={28} className="m-5 mx-16" />
      </div>
    </div>
  );
};

export default SearchSkeleton;
