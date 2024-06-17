import React from "react";
import Header from "./_components/Header";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import Image from "next/image";
import { Instagram } from "lucide-react";

function layout({ children }) {
  return (
    <div>
      <div className="mx-5 md:mx-20 lg:mx-35"> {children}</div>
      <div
          href={"/"}
          className="flex items-center bg-primary bg-opacity-50 text-white py-1 px-2 rounded-md fixed bottom-5 right-5 cursor-pointer hover:bg-primary"
        >
           <Popover>
            <PopoverTrigger className="flex items-center gap-2">
              <Image
                className="rounded-full"
                src={"/PXL_20240207_142809828.jpg"}
                width={30}
                height={30}
              />{" "}
              <p className="text-white text-xs">Made by Rohit</p>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <Link
                className="flex gap-2"
                href={"https://www.instagram.com/_me_rohitt._/"}
              >
                <Instagram className="text-primary"/>
                <p>Instagram</p>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
    </div>
  );
}

export default layout;
