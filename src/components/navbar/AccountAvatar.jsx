import { useClickOutside } from "@mantine/hooks";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AccountAvatar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setDropdownOpen(false));
  const { logoutUser } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="group flex items-center gap-2"
      >
        <Avatar />
      </button>

      <div
        className={`absolute right-0 z-10 -mr-1 mt-3 w-36 rounded bg-gray-50 p-2 shadow-md transition-opacity duration-300 ease-in-out ${
          dropdownOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute -top-2 right-4 h-0 w-0 border-b-8 border-l-8 border-r-8 border-transparent border-b-gray-50"></div>

        <Link
          to="/profile"
          onClick={() => setDropdownOpen(false)}
          className="block rounded px-3 py-2 text-left font-medium text-black hover:bg-gray-200"
        >
          Profile
        </Link>
        <button
          onClick={() => {
            logoutUser();
            setDropdownOpen(false);
          }}
          className="w-full rounded px-3 py-2 text-left font-medium text-black hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default AccountAvatar;
