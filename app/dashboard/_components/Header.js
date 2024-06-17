"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
        <AlertDialog>
          <AlertDialogTrigger>
            <li
              className={`
            hover:text-primary hover:font-bold hover:bg-white py-1 px-2 rounded-full transition-all
            ${
              path == "/dashboard/how" &&
              "text-primary font-bold bg-white py-1 px-2 rounded-full "
            }`}
            >
              AI Based Form Builder
            </li>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Want to visit Formio?</AlertDialogTitle>
              <AlertDialogDescription>
                Formio is a Ai based form builder in which you can{" "}
                <strong>make forms in seconds</strong> and{" "}
                <strong>share with people</strong>, also{" "}
                <strong>get the responses</strong> in spreadsheet.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => router.push("https://formio-omega.vercel.app/")}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
