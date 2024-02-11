"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/edukinniya.png";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className="block cursor-pointer"
      src={logo}
      height="50"
      width="50"
      alt="Logo"
    />
  );
};

export default Logo;
