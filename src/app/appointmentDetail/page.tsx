import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarEventExternal } from "@schedule-x/calendar";
import { Phone } from "lucide-react";

export const AppointmentDetail = ({
  onOpenChange,
  selectedAppointment,
}: {
  onOpenChange: (_value: boolean) => void;
  selectedAppointment: CalendarEventExternal;
}) => {
  console.log(selectedAppointment);
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
          </div>
          <div className="space-x-36">
            <Button className="text-black bg-white border-1 font-bold p-6">
              Edit
            </Button>
            <Button className="text-white bg-[#1f5090] border-1 font-bold p-6">
              Cancel Appointment
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
