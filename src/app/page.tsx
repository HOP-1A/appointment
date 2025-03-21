"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();
  const redirectToBooktime = () => {
    router.push("/taketime");
  };
  return (
    <div>
      <div className=" text-white w-screen h-[340px] bg-[url(https://i.pinimg.com/736x/a2/1c/23/a21c2306e3aea1c1a5b213556c1965c3.jpg)] bg-cover bg-bg-center">
        <div className="flex justify-center gap-[1800px] p-4 text-[24px] font-medium">
          <a href="" className="font-[Oswald]">
            11 Dental clinic
          </a>
          <div className="flex justify-center gap-8">
            <a href="/">Нүүр</a>
            <button onClick={redirectToBooktime}>Цаг захиалга</button>
          </div>
        </div>
        <div className="flex items-center justify-center m-[40px] text-[80px]">
          <div className="font-[Oswald]">
            11 DENTAL CLINIC
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
          <div className="bg-[url('https://www.parents.com/thmb/r4_ugrvFljQZhBwSUA7yVjYopGY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/baby-teeth-319014bcf7f54fb993d9dd2b1b857622.jpg')] bg-cover h-80 w-[600px]"></div>
        </div>
        <div className=" flex justify-center mb-[30px] ">
          <div className="h-[3px] w-[1554px] bg-orange-500"></div>
        </div>
        <div>
          <p className="text-center text-[30px]">11 шүдний эмнэлэг</p>
          <p className="text-center text-[16px]">© 2022</p>
        </div>
      </div>
    </div>
  );
}
