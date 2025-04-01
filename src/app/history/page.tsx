"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Appointment } from "../admin/page";
import { NotepadText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const History = () => {
  const { user } = useUser();
  const [myHistory, setMyHistory] = useState<Appointment[]>([]);
  const [isNotesVisible, setIsNotesVisible] = useState(false);
  const [notes, setNotes] = useState<{ note: string }[]>([]);
  const appointmentHistory = async () => {
    const response = await fetch("/api/weekly-appointment");
    const data = await response.json();
    setMyHistory(data);
  };

  useEffect(() => {
    appointmentHistory();
  }, []);

  const router = useRouter();

  const redirectToHome = () => {
    router.push("/");
  };

  const onOpenChange = (e: boolean) => setIsNotesVisible(e);
  return (
    <>
      {myHistory.length === 0 ? (
        <div className="text-2xl font-black text-[#1f5090] flex justify-center items-center h-screen ">
          LOADING...
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center mt-24 ">
            <div
              className=" pl-10 font-bold text-4xl text-blue-900 cursor-pointer mb-7"
              onClick={redirectToHome}
            >
              Team3 Dental Clinic
            </div>
            {myHistory
              .filter((history) => history.userId === user?.id)
              .map((history, index) => (
                <div key={index}>
                  <div className="flex space-x-4 justify-between items-center border p-4 w-[700px]">
                    <div className="flex space-x-1.5">
                      <div className="font-medium uppercase">
                        {history.firstName}
                      </div>
                      <div className="font-medium uppercase">
                        {history.lastName}
                      </div>
                    </div>

                    <div className="font-medium">{history.reason}</div>
                    <div className="flex items-center">
                      <div className="flex font-bold">
                        <div>
                          {format(history.startDate, "yyyy.MM.dd hh:mm")}
                        </div>
                        <div>-</div>
                        <div>{format(history.endDate, "hh:mm")}</div>
                      </div>
                      {history.notes.length > 0 && (
                        <NotepadText
                          className=" text-blue-900 font-sans w-[30px] h-[30px] rounded-md ml-4"
                          onClick={() => {
                            setIsNotesVisible(true);
                            setNotes(history.notes);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <NotesDialog
            onOpenChange={onOpenChange}
            open={isNotesVisible}
            notes={notes}
          />
        </div>
      )}
    </>
  );
};
export default History;

const NotesDialog = ({
  open,
  onOpenChange,
  notes,
}: {
  open: boolean;
  onOpenChange: (e: boolean) => void;
  notes: { note: string }[];
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="overflow-scroll space-y-4 max-h-[500px] font-sans text-sm">
            {notes.map((note, i) => {
              return (
                <div key={i}>
                  {i + 1}. {note.note}
                </div>
              );
            })}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
