"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  const router = useRouter();
  return (
    <div className="flex p-7 items-center justify-between bg-primary shadow-lg">
      <Image src={"/logo.png"} width={170} height={100} alt="logo" />
      <ul className="hidden md:flex gap-5 text-white">
        <li
          className={`
        hover:text-primary hover:font-bold hover:bg-white py-1 px-2 rounded-full transition-all
        ${
          path == "/dashboard" &&
          "text-primary font-bold bg-white py-1 px-2 rounded-full "
        }`}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </li>
        <li
          className={`
            hover:text-primary hover:font-bold hover:bg-white py-1 px-2 rounded-full transition-all
            ${
              path == "/dashboard/upgrade" &&
              "text-primary font-bold bg-white py-1 px-2 rounded-full "
            }`}
          onClick={() => router.push("/dashboard/upgrade")}
        >
          Upgrade
        </li>
      </ul>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <button
          className="px-5 py-1 rounded-lg bg-white text-primary font-bold"
          onClick={() => router.push("/dashboard")}
        >
          Sign In
        </button>
      )}
    </div>
  );
}

export default Header;
