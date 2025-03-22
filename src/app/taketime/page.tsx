"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
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
import { Clock } from "lucide-react";
import { Phone } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  isBefore,
  format,
  addHours,
  setMinutes,
  setSeconds,
  setHours,
} from "date-fns";
import { useUser } from "@clerk/nextjs";

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
                  <Button
                    onClick={openModal}
                    className="w-52 mt-5 bg-[#1f5090] font-semibold p-3"
                  >
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [treatment, setTreatment] = useState("");

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  const { user } = useUser();
  const bookTime = async () => {
    const [hours, minutes] = selectedTime!.split(":").map(Number);

    // Set the extracted hours and minutes on the date object
    const startDate = setSeconds(
      setMinutes(setHours(date!, hours), minutes),
      0
    );

    const endDate = addHours(startDate, 1);

    try {
      const resJSON = await fetch("/api/time-book", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          reason: treatment,
          startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
          endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
          firstName,
          lastName,
          phoneNumber,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await resJSON.json();

      if (resJSON.ok) {
        alert("Таны цаг амжилттай захиалагдлаа. Бид тантай холбогдох болно.");
        onOpenChange(false);
      } else if (resJSON.status === 401 && data.error === "already booked") {
        alert("Энэ цаг аль хэдийн захиалагдсан байна. Өөр цаг сонгоно уу.");
      } else {
        alert("Алдаа гарлаа. Дахин оролдоно уу.");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !date ||
      !selectedTime ||
      !treatment
    ) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }
    console.log(date);
    const bookingInfo = {
      firstName,
      lastName,
      phoneNumber,
      date: format(date, "yyyy:MM:dd HH:mm"),
      time: selectedTime,
      treatment,
    };

    console.log("Booking info:", bookingInfo);

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col md:flex-row gap-4 max-w-3xl">
        <div className="flex-1">
          <DialogTitle className="text-3xl text-[#1f5090]">
            Цаг захиалах
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogDescription className="mt-3">Эмчилгээ:</DialogDescription>
            <Select value={treatment} onValueChange={setTreatment}>
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
                <SelectItem value="Сувгийн эмчилгээ">
                  Сувгийн эмчилгээ
                </SelectItem>
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
              pattern="[0-9]{8}"
              placeholder="Жишээ: 96043232"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button
              onClick={bookTime}
              type="submit"
              className="mt-5 bg-[#1f5090] w-full"
            >
              Хадгалах
            </Button>
          </form>
        </div>

        <div className="flex-1 flex flex-col">
          <DialogDescription className="mb-2">Өдөр сонгох:</DialogDescription>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(e) => {
              if (!e) return;
              if (isBefore(new Date(), e)) {
                setDate(e);
                // setSelectedTime(null);
              }
            }}
            className="rounded-md border"
            disabled={(date) =>
              isBefore(date, new Date()) || date.getDay() === 0
            }
          />

          {date && (
            <div className="mt-4">
              <DialogDescription className="mb-2">
                {format(date, "yyyy-MM-dd")} өдрийн цаг сонгох:
              </DialogDescription>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`${
                      selectedTime === time
                        ? "bg-[#1f5090]"
                        : "border-[#1f5090] text-[#1f5090]"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
