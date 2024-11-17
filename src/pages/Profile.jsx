import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileById } from "../api/api";
import UserReviewCard from "../components/review/UserReviewCard";

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

const Profile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const { data, isPending, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserProfileById(id),
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  //   if (isError) {
  //     return <Navigate to="/login" state={{ returnTo: location }} replace />;
  //   }

  if (isPending) {
    return <div>Fetching</div>;
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

      <div className="mt-6">
        <TabPanel index={0} activeTab={activeTab}>
          <div className="w-full rounded-lg border border-gray-300 p-6 lg:max-w-[800px]">
            {data.reviews.length > 0 ? (
              <div className="space-y-5">
                {data.reviews.map((review) => (
                  <UserReviewCard
                    key={review._id}
                    review={review}
                    userId={id}
                    name={data.user.name}
                  />
                ))}
              </div>
            ) : (
              <div>no reviews</div>
            )}
          </div>
        </TabPanel>
        <TabPanel index={1} activeTab={activeTab}>
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Account Settings</h2>
            <p>
              Here, you can update your personal information, change your
              password, and more.
            </p>
          </div>
        </TabPanel>
      </div>
    </div>
  );
};

export default Profile;
