"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        userName,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-[#111827] md:w-96">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="User Name"
            required
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <Button className="text-white font-bold cursor-pointer px-6 py-2">
            Login
          </Button>
          {error && (
            <div className="text-red-600  text-sm py-1 px-3 rounded-md mt-2 flex items-center justify-center w-full">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
