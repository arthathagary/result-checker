import Link from "next/link";
import Container from "./Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-[#030712] dark:bg-[#F9FAFB]">
      <Container>
        <div className="md:py-4 py-2 flex md:flex-row flex-col items-center justify-between gap-1 md:gap-0">
          <Link href="https://www.edukinniya.lk/2023/08/social-medias.html">
            <h1 className="text-white dark:text-[#030712] text-sm md:text-base">
              &copy; {currentYear} EduKinnniya
            </h1>
          </Link>
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
