"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  isBefore,
  format,
  addHours,
  setMinutes,
  setSeconds,
  setHours,
} from "date-fns";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

export const TakeTimeDialog = ({
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      phoneNumber === "" ||
      date === undefined ||
      selectedTime === "" ||
      treatment === ""
    ) {
      alert("Бүгдийн бөглөнө үү!");
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const { user } = useUser();
  const bookTime = async () => {
    const [hours, minutes] = selectedTime!.split(":").map(Number);

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
        setIsOpen(false);
        onOpenChange(false);
        alert("Энэ цаг аль хэдийн захиалагдсан байна. Өөр цаг сонгоно уу.");
      } else {
        alert("Алдаа гарлаа. Дахин оролдоно уу.");
      }
    } catch (error) {
      console.log(error);
    }
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
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="шалтгаанаа сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="үзлэг зөвөлгөө">Үзлэг зөвлөгөө</SelectItem>
                <SelectItem value="Эмчилгээний давтан">
                  Эмчилгээний давтан
                </SelectItem>
                <SelectItem value="Бүрээс хийх">Бүрээс хийх</SelectItem>
                <SelectItem value="Шүдний ломбо хийх">
                  Шүдний ломбо хийх
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
