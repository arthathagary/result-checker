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
        className="block cursor-pointer border-2 dark:border-[#030712] rounded-full"
        src={logo}
        height="50"
        width="50"
        alt="Logo"
      />
    </div>
  );
};

export default Logo;
