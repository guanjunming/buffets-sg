import { useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/api";
import { PiCalendarDots } from "react-icons/pi";
import { formatDateShort } from "../utils/utils";
import { useAuth } from "../context/AuthProvider";
import { CircularProgress } from "@mui/material";
import ProfileReviewsPanel from "../components/profile/ProfileReviewsPanel";
import AccountSettingsPanel from "../components/profile/AccountSettingsPanel";
import FavouritesPanel from "../components/profile/FavouritesPanel";

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
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "reviews";
  const [activeTab, setActiveTab] = useState(initialTab);

  const { data, isPending, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    enabled: isLoggedIn,
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`?tab=${tab}`, { replace: true });
  };

  if (isPending) {
    return (
      <div className="m-10 flex justify-center">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/login" state={{ returnTo: location }} replace />;
  }

  return (
    <div className="p-6">
      <div className="mb-4 border-b border-gray-200">
        <nav className="flex gap-4">
          <Tab index="reviews" activeTab={activeTab} onClick={handleTabClick}>
            Reviews
          </Tab>
          <Tab
            index="favourites"
            activeTab={activeTab}
            onClick={handleTabClick}
          >
            Favourites
          </Tab>
          <Tab index="settings" activeTab={activeTab} onClick={handleTabClick}>
            Account Settings
          </Tab>
        </nav>
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="hidden w-[40%] border-r lg:block">
          <div className="mr-6 space-y-3 rounded border border-gray-200 p-6">
            <div className="font-bold">Intro</div>
            <div className="mb-3 flex items-center gap-1">
              <PiCalendarDots />
              <span className="text-sm">{`Joined in ${formatDateShort(data.user.createdAt)}`}</span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <TabPanel index="reviews" activeTab={activeTab}>
            <div className="w-4/5 rounded border border-gray-200">
              <ProfileReviewsPanel reviews={data.reviews} user={data.user} />
            </div>
          </TabPanel>
          <TabPanel index="favourites" activeTab={activeTab}>
            <FavouritesPanel />
          </TabPanel>

          <TabPanel index="settings" activeTab={activeTab}>
            <div className="w-4/5 rounded border border-gray-200">
              <AccountSettingsPanel user={data.user} />
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default Profile;
