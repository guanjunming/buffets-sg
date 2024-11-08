import { Slide, useScrollTrigger } from "@mui/material";
import NavbarContent from "./NavbarContent";

const Navbar = () => {
  const trigger = useScrollTrigger();

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <div className="fixed w-full">
          <NavbarContent />
        </div>
      </Slide>

      <div className="p-9">Navbar</div>
    </>
  );
};

export default Navbar;
