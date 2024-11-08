import { SiIfood } from "react-icons/si";

const NavbarLogo = () => {
  return (
    <div className="flex items-center justify-between gap-1 hover:cursor-pointer">
      <SiIfood color="blue" size={50} />
      <div className="text-2xl font-black text-blue-400">Buffets SG</div>
    </div>
  );
};

export default NavbarLogo;
