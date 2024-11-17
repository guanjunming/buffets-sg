import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/api";
import UserReviewCard from "../components/review/UserReviewCard";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalendarDots } from "react-icons/pi";
import { formatDateShort } from "../utils/utils";

const Tab = ({ children, index, activeTab, onClick }) => {
  return (
    <button
      onClick={() => onClick(index)}
      className={`px-4 py-2 ${
        activeTab === index
          ? "border-b-2 border-blue-700 font-medium text-blue-800"
          : "hover:text-blue-800"
      }`}
    >
      {children}
    </button>
  );
};

function TabPanel({ children, index, activeTab }) {
  return (
    <div hidden={index !== activeTab}>
      {index === activeTab && <div>{children}</div>}
    </div>
  );
}

const PAGE_SIZE = 15;

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [reviewsToShow, setReviewsToShow] = useState(PAGE_SIZE);
  const location = useLocation();

  const { data, isPending, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleShowMore = () => {
    setReviewsToShow((prev) => prev + PAGE_SIZE);
  };

  if (isPending) {
    return <div>Fetching</div>;
  }

  if (isError) {
    return <Navigate to="/login" state={{ returnTo: location }} replace />;
  }

  return (
    <div className="p-6">
      <div className="mb-4 border-b border-gray-200">
        <nav className="flex gap-4">
          <Tab index={0} activeTab={activeTab} onClick={handleTabClick}>
            Reviews
          </Tab>
          <Tab index={1} activeTab={activeTab} onClick={handleTabClick}>
            Account Settings
          </Tab>
        </nav>
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="hidden w-1/4 space-y-3 border-r lg:block">
          <div className="space-y-3 p-6">
            <div className="font-bold">Intro</div>
            <div className="mb-3 flex items-center gap-1">
              <PiCalendarDots />
              <span className="text-sm">{`Joined in ${formatDateShort(data.user.createdAt)}`}</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/5">
          <TabPanel index={0} activeTab={activeTab}>
            <div className="w-full rounded-md border border-gray-200 p-6">
              {data.reviews.length > 0 ? (
                <div>
                  <div className="space-y-5">
                    {data.reviews.slice(0, reviewsToShow).map((review) => (
                      <UserReviewCard
                        key={review._id}
                        review={review}
                        name={data.user.name}
                      />
                    ))}
                  </div>
                  {reviewsToShow < data.reviews.length && (
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={handleShowMore}
                        className="rounded-lg bg-blue-900 px-4 py-3 text-white hover:bg-blue-800"
                      >
                        <div className="flex items-center gap-1">
                          <span>Show more</span>
                          <span>
                            <IoIosArrowDown />
                          </span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="m-auto max-w-[550px] p-6">
                  <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <h3 className="text-xl font-bold">
                      Write your first review!
                    </h3>
                    <p className="text-gray-600">
                      Your thoughts can guide others to the best dining
                      experiences. Start by reviewing your favorite buffet
                      restaurant!
                    </p>
                    <Link
                      to="/"
                      className="rounded-md bg-blue-900 px-4 py-3 text-white hover:bg-blue-800"
                    >
                      Find Buffets
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel index={1} activeTab={activeTab}>
            <div>
              <p>Update name, change password</p>
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default Profile;
