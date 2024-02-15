"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/edukinniya.png";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="inline-block">
      <Image
        onClick={() => router.push("/")}
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
