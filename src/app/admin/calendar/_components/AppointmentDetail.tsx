"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarEventExternal } from "@schedule-x/calendar";
import { Phone } from "lucide-react";
import { useState } from "react";
import { Note } from "../../page";

export const AppointmentDetail = ({
  onOpenChange,
  selectedAppointment,
}: {
  onOpenChange: (_value: boolean) => void;
  selectedAppointment: CalendarEventExternal;
}) => {
  const [open, setOpen] = useState(false);
  const [noteValue, setNoteValue] = useState("");
  const saveNote = async () => {
    const response = await fetch("/api/note", {
      method: "POST",
      body: JSON.stringify({
        note: noteValue,
        bookTimeId: selectedAppointment.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setNoteValue("");
      setOpen(false);
    }
  };

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <Card className="p-6">
          <DialogTitle className="font-bold text-3xl text-black">
            Appointment Details
          </DialogTitle>
          <div className="font-semibold text-2xl ">
            {selectedAppointment.title}
          </div>
          <div>
            <div className="font-semibold text-2xl text-black"></div>
            <div className="flex items-center gap-1">
              <Phone height={15} width={15} />
              <div className="text-xl">{selectedAppointment.phoneNumber}</div>
            </div>
          </div>
          <hr />
          <div className="mb-5">
            <div className="flex gap-44">
              <div>
                <div className="font-semibold text-[18px] text-black">Time</div>
                <div>{selectedAppointment.start}</div>
              </div>
              <div>
                <div className="font-semibold text-[18px] text-black">
                  Duration
                </div>
                <div>{selectedAppointment.duration} 1h</div>
              </div>
            </div>
            <div className="mt-3 mb-3">
              <div className="font-semibold text-[18px] text-black">Type</div>
              <div>{selectedAppointment.reason}</div>
            </div>
            <div className="mt-3">
              <div className="font-semibold text-[18px] text-black">Notes</div>
              {selectedAppointment.notes.map((note: Note, index: number) => {
                return <div key={index}>{note.note}</div>;
              })}
            </div>
          </div>
          {open === true ? (
            <div className="flex justify-between align-center h-[60px]">
              <Input
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
                className="h-[40px w-[340px]"
              />{" "}
              <Button
                className=" bg-[#1f5090] h-[37px]"
                onClick={() => saveNote()}
              >
                Save
              </Button>
            </div>
          ) : null}

          <Button
            onClick={() => setOpen(true)}
            className="text-white bg-[#1f5090] border-1 font-bold p-6"
          >
            Note
          </Button>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
