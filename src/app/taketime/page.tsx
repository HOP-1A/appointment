"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Clock } from "lucide-react";
import { Phone } from "lucide-react";
import { useState } from "react";
import { TakeTimeDialog } from "@/components/take-time/timeDialog";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const router = useRouter();
  const redirectToHome = () => {
    router.push("/");
  };

  const redirectToHistory = () => {
    router.push("/history");
  };

  return (
    <>
      <div>
        <div className="flex flex-row gap-48 justify-center bg-[#f9f9f9] h-14 items-center mb-3">
          <div className="flex flex-row" onClick={redirectToHome}>
            <img
              src="https://shud-info.itdoctor.mn/img/logo.png"
              height={25}
              width={25}
              alt="Logo"
            />
            <div className="font-semibold">Шүдний эмнэлгийн систем</div>
          </div>

          <div className="text-[#215495]">
            Эрүүл шүд - Эрүүл бие эрхэмсэг гоо сайхныг цогцлооно.
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col items-center">
            <div className="flex flex-row space-x-[300px] mb-5">
              <div className="text-4xl font-bold text-[#1f5090]">
                Team3 Dental Clinic
              </div>
              <div className="space-x-5">
                <Button onClick={redirectToHistory} className="bg-[#1f5090]">
                  Цаг авсан түүх
                </Button>
                <Button onClick={openModal} className="w-48 bg-[#1f5090]">
                  Цаг авах
                </Button>
              </div>
            </div>
            <img
              className="rounded-2xl w-full max-w-[900px]"
              src="https://shud-info.itdoctor.mn/img/online-booking-1728215180"
              alt="Dental clinic"
            />
            <div className="flex flex-row space-x-5 mt-5">
              <Card className="w-[570px]">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-[#1f5090]">
                    Бидний тухай:
                  </CardTitle>
                  <CardDescription className="mt-3 text-[#1f5090]">
                    Манай шүдний эмнэлэг үзлэг оношилгоог мэргэжлийн өндөр
                    түвшинд оношилж, орчин үеийн техник технологийг ашиглан
                    чанартай материалаар эмчилгээг хийж байна.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="w-[310px] flex justify-center items-center">
                <CardHeader>
                  <CardTitle>Team3 Dental Clinic</CardTitle>
                  <div className="flex flex-row items-center gap-1">
                    <Clock
                      className="fill-[#215495] text-white"
                      width={19}
                      height={19}
                    />
                    <CardDescription className="text-[#1f5090]">
                      Цагийн хуваарь: 09:00-20:00
                    </CardDescription>
                  </div>
                  <div className="flex flex-row items-center gap-1 ">
                    <Phone
                      className="fill-[#215495] text-[#215495]"
                      width={15}
                      height={19}
                    />
                    <CardDescription className="text-[#1f5090]">
                      Утас: 96043232
                    </CardDescription>
                  </div>
                  <Button
                    onClick={openModal}
                    className="w-52 mt-5 bg-[#1f5090] font-semibold p-3">
                    Цаг авах
                  </Button>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex bg-[#152b46] text-white h-28 items-center font-medium mt-5 justify-center">
          PINECONE © 2015-2025
        </div>
        <TakeTimeDialog open={isModalOpen} onOpenChange={closeModal} />
      </div>
    </>
  );
};

export default Page;
