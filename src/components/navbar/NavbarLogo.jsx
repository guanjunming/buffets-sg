import { SiIfood } from "react-icons/si";

const NavbarLogo = () => {
  return (
    <div className="flex items-center justify-between gap-1 hover:cursor-pointer hover:opacity-80">
      <SiIfood color="rgb(30,64,175)" size={50} />
      <div className="text-2xl font-black text-blue-800">Buffets SG</div>
    </div>
  );
};

export default NavbarLogo;
