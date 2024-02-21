"use client";
import { usePathname, useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
const Logout = () => {
  const currentRoute = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    signOut(); // Call NextAuth's signOut function
    router.push("/admin");
  };
  if (currentRoute === "/dashboard") {
    return (
      <div onClick={handleLogout}>
        <IoLogOutOutline
          size={44}
          className="text-white dark:text-[#030712] cursor-pointer transition duration-300 ease-in-out hover:scale-110"
        />
      </div>
    );
  }
  return <div>{""}</div>;
};

export default Logout;
