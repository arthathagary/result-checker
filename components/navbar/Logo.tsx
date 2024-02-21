"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/edukinniya.png";
import { usePathname } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  const currentRoute = usePathname();

  const handleClick = () => {
    if (currentRoute === "/") {
      // If already on the home route, refresh the page
      window.location.reload();
    } else {
      // If not on the home route, push to the home route
      router.push("/");
    }
  };
  return (
    <div className="inline-block">
      <Image
        onClick={handleClick}
        className="block cursor-pointer border-2 dark:border-[#030712] h-14 w-14 md:h-16 md:w-16 rounded-full"
        src={logo}
        alt="Logo"
      />
    </div>
  );
};

export default Logo;
