import { useEffect, useState } from "react";
import { Drawer, useMediaQuery } from "@mui/material";
import { IoMenu, IoClose } from "react-icons/io5";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";

const NavbarDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { openLoginModal } = useModal();
  const isAboveMd = useMediaQuery("(min-width:768px)");
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    if (isAboveMd && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [isAboveMd, isDrawerOpen]);

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
            {user ? (
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
                  Sign out
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
            <NavbarSearch />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default NavbarDrawer;
