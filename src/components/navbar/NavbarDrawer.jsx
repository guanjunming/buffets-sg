import { useState } from "react";
import { Drawer } from "@mui/material";
import { IoMenu, IoClose } from "react-icons/io5";
import { useModal } from "../../context/ModalContext";

const NavbarDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { openLoginModal } = useModal();

  return (
    <div className="flex md:hidden">
      <IoMenu
        color="white"
        size={50}
        onClick={() => setIsDrawerOpen(true)}
        className="rounded-lg border border-gray-400 px-2 py-1 hover:cursor-pointer hover:border-white hover:bg-neutral-700"
      />
      <Drawer
        anchor="top"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="border-b border-gray-400 bg-neutral-900 text-white">
          <div className="m-5 flex items-center justify-end">
            <IoClose
              color="white"
              size={40}
              onClick={() => setIsDrawerOpen(false)}
              className="rounded-lg border border-gray-400 p-1 hover:cursor-pointer hover:border-white hover:bg-neutral-700"
            />
          </div>

          <div className="m-5 text-left">
            {["Directory", "Popular", "Review", "About"].map((item, idx) => (
              <div
                key={idx}
                className="rounded px-3 py-2 hover:cursor-pointer hover:bg-neutral-700"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="m-5">
            <div
              className="m-3 rounded bg-blue-900 px-2 py-1 hover:cursor-pointer hover:bg-blue-800"
              onClick={openLoginModal}
            >
              Sign in
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default NavbarDrawer;
