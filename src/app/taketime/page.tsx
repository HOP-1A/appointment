"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneNumber } from "@clerk/nextjs/server";
import { Clock } from "lucide-react";
import { Phone } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <div className="flex flex-row gap-48 justify-center bg-[#f9f9f9] h-14 items-center mb-3">
          <div className="flex flex-row">
            <img
              src="https://shud-info.itdoctor.mn/img/logo.png"
              height={25}
              width={25}
            />
            <div className="font-semibold">Шүдний эмнэлгийн систем</div>
          </div>

          <div className="text-[#215495]">
            Эрүүл шүд - Эрүүл бие эрхэмсэг гоо сайхныг цогцлооно.
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col  items-center">
            <div className="flex flex-row space-x-[450px] mb-5">
              <div className="text-4xl font-bold text-[#1f5090]">
                11 Dental Clinic
              </div>
              <Button onClick={openModal} className="w-48 bg-[#1f5090]">
                Цаг авах
              </Button>
            </div>
            <img
              className="rounded-2xl w-full max-w-[900px]"
              src="https://shud-info.itdoctor.mn/img/online-booking-1728215180"
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
                  <CardTitle>11 Dental Clinic</CardTitle>
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
                  <Button className="w-52  mt-5 bg-[#1f5090] font-semibold p-3">
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
      <div className="flex bg-[#152b46] text-white h-28 items-center font-medium mt-5">
        PINECONE © 2015-2025
      </div>
    </>
  );
};

export default Page;

const TakeTimeDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(false)}>
      <DialogContent>
        <form>
          <DialogTitle className="text-3xl">Цаг захиалах</DialogTitle>
          <DialogDescription className="mt-3">Эмчилгээ:</DialogDescription>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="шалтгаанаа сонгоно уу" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="үзлэг зөвөлгөө">үзлэг зөвөлгөө</SelectItem>
              <SelectItem value="Эмчилгээний давтан">
                Эмчилгээний давтан
              </SelectItem>
              <SelectItem value="Бүрээс хийх">
                Бүрээс хийх/Porcelian Fused-to-Metal Crowns PFM, PFZ/
              </SelectItem>
              <SelectItem value="Шүдний ломбо хийх">
                Шүдний ломбо хийх/Composite Fillings/
              </SelectItem>
              <SelectItem value="Гажиг засал">Гажиг засал</SelectItem>
              <SelectItem value="Сувгийн эмчилгээ">Сувгийн эмчилгээ</SelectItem>
              <SelectItem value="Шүд авхуулах">Шүд авхуулах</SelectItem>
              <SelectItem value="Хиймэл шүд">Хиймэл шүд</SelectItem>
            </SelectContent>
          </Select>
          <DialogDescription className="mt-3">Овог: </DialogDescription>
          <Input
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <DialogDescription className="mt-3">Нэр: </DialogDescription>
          <Input
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          <DialogDescription className="mt-3">Утас: </DialogDescription>
          <Input
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button onClick={inputCheck} className="mt-3 bg-[#1f5090] w-[100px]">
            Хадгалах
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
