"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function upgrade() {
  const router = useRouter();
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Upgrade</h2>
      <h2 className="text-gray-500">Zyada paise arre ?? Chal krde fir....</h2>
      <div className="flex my-10 gap-10 justify-center items-center">
        <div className="hover:shadow-2xl transition-all  flex flex-col justify-center items-center border rounded-lg p-5 gap-5 shadow-lg">
          <Image src={"/momo.svg"} height={100} width={200} />
          <Button onClick={() => router.push("https://wa.link/lghbse")}>
            Sponser Momos
          </Button>
        </div>
        <div className="hover:shadow-2xl transition-all flex flex-col justify-center items-center border rounded-lg p-5 gap-5 shadow-lg">
          <Image src={"/shake.svg"} height={100} width={200} />
          <Button onClick={() => router.push("https://wa.link/a498oe")}>
            Sponser Shake
          </Button>
        </div>
        <div className="hover:shadow-2xl transition-all flex flex-col justify-center items-center border rounded-lg p-5 gap-5 shadow-lg">
          <Image src={"/drink.svg"} height={100} width={200} />
          <Button onClick={() => router.push("https://wa.link/5pfhm9")}>
            Sponser Shikanji
          </Button>
        </div>
      </div>
    </div>
  );
}

export default upgrade;
