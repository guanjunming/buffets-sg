import { Slide, useScrollTrigger } from "@mui/material";
import NavbarContent from "../components/navbar/NavbarContent";

const Navbar = () => {
  const trigger = useScrollTrigger();

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <div className="fixed w-full bg-neutral-100 shadow shadow-black">
          <NavbarContent />
        </div>
      </Slide>

      <div className="p-9">Navbar</div>
    </>
  );
};

export default Navbar;
