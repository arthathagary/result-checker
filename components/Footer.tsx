import React from "react";
import Container from "./Container";

const Footer = () => {
  return (
    <div>
      <div className="w-full bg-[#111827] dark:bg-[#F9FAFB] z-10 shadow-sm relative bottom-0">
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
              {/* <Logo /> */}
              <h1 className="text-white dark:text-black">EduKinniya</h1>
              {/* <ModeToggle /> */}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Footer;
