import { Link } from "react-router-dom";
import NavbarLogo from "./NavbarLogo";
import NavbarSearch from "./NavbarSearch";
import NavbarDrawer from "./NavbarDrawer";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import AccountAvatar from "./AccountAvatar";

const NavbarContent = () => {
  const { openLoginModal } = useModal();
  const { user } = useAuth();

  return (
    <div className="m-auto flex max-w-screen-xl items-center justify-between gap-10 p-5">
      <Link to="/" title="BuffetsSG Home">
        <NavbarLogo />
      </Link>

      <div className="hidden w-full max-w-md md:block">
        <NavbarSearch />
      </div>

      <div className="hidden md:block">
        {user ? (
          <AccountAvatar />
        ) : (
          <div
            className="rounded bg-blue-900 px-3 py-2 text-white hover:cursor-pointer hover:bg-blue-800"
            onClick={openLoginModal}
          >
            Sign in
          </div>
        )}
      </div>

      <NavbarDrawer />
    </div>
  );
};

export default NavbarContent;
