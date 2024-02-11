"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/cover.jpg";

const CoverImg = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className="block cursor-pointer rounded-lg"
      src={logo}
      height="2400"
      width="561"
      alt="Logo"
    />
  );
};

export default CoverImg;
