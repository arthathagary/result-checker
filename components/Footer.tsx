import React from "react";
import Container from "./Container";
import Logo from "./navbar/Logo";
import { ModeToggle } from "./modetoggle";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#030712] dark:bg-[#F9FAFB]">
      <Container>
        <div className="md:py-4 py-2 flex md:flex-row flex-col items-center justify-between gap-1 md:gap-0">
          <h1 className="text-white dark:text-[#030712] text-sm md:text-base">
            &copy; 2024 EduKinnniya
          </h1>
          <h1 className="text-white dark:text-[#030712] text-sm md:text-base">
            <Link
              href="https://www.linkedin.com/in/arthathagary/"
              target="_blank"
            >
              Developed by Agary
            </Link>
          </h1>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
