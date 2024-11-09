import NavbarLogo from "./NavbarLogo";
import NavbarDrawer from "./NavbarDrawer";
import { useContext } from "react";
import { ModalContext } from "../../App";

const NavbarContent = () => {
  const { openLoginModal, openSignupModal } = useContext(ModalContext);

  return (
    <div className="flex items-center justify-between gap-5 bg-neutral-900 p-5 shadow shadow-white">
      <div className="flex items-center justify-between gap-5">
        <NavbarLogo />
        <div className="hidden items-center justify-between gap-5 md:flex">
          {["Directory", "Popular", "Review", "About"].map((item, idx) => (
            <div
              key={idx}
              className="rounded px-3 py-2 hover:cursor-pointer hover:bg-neutral-700"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden items-center justify-between gap-5 md:flex">
        <div
          className="rounded border px-3 py-2 hover:cursor-pointer hover:bg-neutral-700"
          onClick={openLoginModal}
        >
          Login
        </div>
        <div className="rounded bg-blue-900 px-3 py-2 hover:cursor-pointer hover:bg-blue-800">
          Sign Up
        </div>
      </div>

      <NavbarDrawer />
    </div>
  );
};

export default NavbarContent;
