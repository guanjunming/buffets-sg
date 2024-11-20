import { Link } from "react-router-dom";
import NavbarLogo from "./NavbarLogo";
import NavbarSearch from "./NavbarSearch";
import AccountAvatar from "./AccountAvatar";
import NavbarDrawer from "./NavbarDrawer";
import { useModal } from "../../context/ModalProvider";
import { useAuth } from "../../context/AuthProvider";

const NavbarContent = () => {
  const { openLoginModal } = useModal();
  const { isLoggedIn } = useAuth();

  return (
    <div className="m-auto flex max-w-screen-xl items-center justify-between gap-10 p-5">
      <Link to="/" title="BuffetsSG Home">
        <NavbarLogo />
      </Link>

      <div className="hidden w-full max-w-md md:block">
        <NavbarSearch isSuggest={true} />
      </div>

      <div className="hidden md:block">
        {isLoggedIn ? (
          <AccountAvatar />
        ) : (
          <button
            className="rounded bg-blue-900 px-3 py-2 text-white hover:bg-blue-800"
            onClick={openLoginModal}
          >
            Sign in
          </button>
        )}
      </div>

      <NavbarDrawer />
    </div>
  );
};

export default NavbarContent;
