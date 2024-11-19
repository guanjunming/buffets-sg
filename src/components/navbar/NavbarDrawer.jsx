import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer, useMediaQuery } from "@mui/material";
import { IoMenu, IoClose } from "react-icons/io5";
import NavbarSearch from "./NavbarSearch";
import { useModal } from "../../context/ModalProvider";
import { useAuth } from "../../context/AuthProvider";

const NavbarDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isAboveMd = useMediaQuery("(min-width:768px)");
  const location = useLocation();
  const { openLoginModal } = useModal();
  const { isLoggedIn, logoutUser } = useAuth();

  useEffect(() => {
    if (isAboveMd && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [isAboveMd, isDrawerOpen]);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  return (
    <div className="flex md:hidden">
      <IoMenu
        size={50}
        onClick={() => setIsDrawerOpen(true)}
        className="rounded-lg border border-neutral-500 px-2 py-1 hover:cursor-pointer hover:border-black hover:bg-neutral-200"
        title="Open"
      />
      <Drawer
        anchor="top"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="bg-neutral-100">
          <div className="m-5 flex items-center justify-end">
            <IoClose
              size={40}
              onClick={() => setIsDrawerOpen(false)}
              className="rounded-lg border border-neutral-500 p-1 hover:cursor-pointer hover:border-black hover:bg-neutral-200"
              title="Close"
            />
          </div>

          <div className="m-5">
            {isLoggedIn ? (
              <div className="text-left">
                <Link
                  to="/profile"
                  onClick={() => setIsDrawerOpen(false)}
                  className="block rounded px-3 py-2 hover:cursor-pointer hover:bg-neutral-200"
                >
                  Profile
                </Link>
                <div
                  onClick={() => {
                    logoutUser();
                    setIsDrawerOpen(false);
                  }}
                  className="rounded px-3 py-2 hover:cursor-pointer hover:bg-neutral-200"
                >
                  Logout
                </div>
              </div>
            ) : (
              <div
                className="m-3 rounded bg-blue-900 px-3 py-2 text-center text-white hover:cursor-pointer hover:bg-blue-800"
                onClick={openLoginModal}
              >
                Sign in
              </div>
            )}
          </div>

          <div className="m-auto my-5 max-w-md p-5">
            <NavbarSearch isSuggest={false} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default NavbarDrawer;
