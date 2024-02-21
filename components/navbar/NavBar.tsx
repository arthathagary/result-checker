import Container from "../Container";
import { ModeToggle } from "../modetoggle";
import Logo from "./Logo";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <div className="md:fixed w-full bg-[#111827] dark:bg-[#F9FAFB] z-10 shadow-sm mb-6 md:mb-0">
      <div
        className="
        py-4
        "
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
            
          "
          >
            <div>
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <Logout />
              <ModeToggle />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
