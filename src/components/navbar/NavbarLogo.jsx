import { SiIfood } from "react-icons/si";

const NavbarLogo = () => {
  return (
    <div className="flex items-center justify-between gap-1 text-blue-900 hover:cursor-pointer hover:text-blue-800">
      <SiIfood size={50} />
      <div className="text-2xl font-black">Buffets SG</div>
    </div>
  );
};

export default NavbarLogo;
