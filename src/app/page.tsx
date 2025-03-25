"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();
  const redirectToBooktime = () => {
    router.push("/taketime");
  };
  return (
    <div>
      <div className=" text-white w-screen h-[340px] bg-[url(https://i.pinimg.com/736x/6b/cc/7f/6bcc7f90504c74f286dca773ecfc7daf.jpg)] bg-cover">
        <div className="flex justify-between p-4 text-[24px] font-medium">
          <a href="" className="font-[Oswald]">
            TEAM3 Dental clinic
          </a>
          <div className="flex justify-center space-x-12">
            <a href="/" className="font-bold">
              Нүүр
            </a>
            <button onClick={redirectToBooktime} className="font-bold">
              Цаг захиалга
            </button>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="flex items-center justify-center m-[40px] text-[80px]">
          <div className="font-[Oswald]">
            TEAM3 DENTAL CLINIC
            <div className="h-[10px] w-auto bg-orange-500"></div>
          </div>
        </div>
      </div>
      <div className="mb-14 mt-14">
        <h1 className="text-center text-[48px] text-blue-300 font-[Playfair_Display] font-medium">
          BE PROUD OF YOUR SMILE
        </h1>
        <p className="text-center text-[18px] font-medium text-blue-900">
          Эрүүл шүд - Эрүүл бие эрхэмсэг гоо сайхныг цогцлооно
        </p>
      </div>
      <div className="flex flex-col justify-center gap-3 ">
        <div className="flex justify-center mb-14">
          <div className="bg-[url('https://i.pinimg.com/736x/c6/63/ba/c663bab326e516c8ccabd6e7f50d45ec.jpg')] bg-cover h-100 w-[500px]"></div>
        </div>
        <div className=" flex justify-center mb-[30px] ">
          <div className="h-[3px] w-[1554px] bg-orange-500"></div>
        </div>
        <div>
          <p className="text-center text-[30px] text-blue-900">
            Team3 шүдний эмнэлэг
          </p>
          <p className="text-center text-[16px] text-blue-900">© 2024</p>
        </div>
      </div>
    </div>
  );
}
