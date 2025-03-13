import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Phone } from "lucide-react";

const data = {
  date: "March 12, 2025",
  doctor: "Emily Davis",
  phonenumber: "555-555-5555",
  time: "10:00 AM",
  duration: "30 minutes",
  type: "Consultation",
  notes: "Patient is in critical condition",
};

const Page = () => {
  return (
    <div>
      <div>
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <Card className="p-6">
                <DialogDescription>
                  <div className="font-bold text-3xl text-black">
                    Appointment Details
                  </div>
                  <div className="font-semibold">{data.date}</div>
                  <div className="mb-5 mt-3">
                    <div className="font-semibold text-2xl text-black">
                      {data.doctor}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone height={15} width={15} />
                      <div>{data.phonenumber}</div>
                    </div>
                  </div>

                  <hr />
                  <div className="mt-3 mb-5">
                    <div className="flex gap-44">
                      <div>
                        <div className="font-semibold text-[18px] text-black">
                          Time
                        </div>
                        <div>{data.time}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-[18px] text-black">
                          Duration
                        </div>
                        <div>{data.duration}</div>
                      </div>
                    </div>

                    <div className="mt-3 mb-3">
                      <div className="font-semibold text-[18px] text-black">
                        Type
                      </div>
                      <div>{data.type}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[18px] text-black">
                        Notes
                      </div>
                      <div className="20px bg-neutral-100 rounded-sm h-12 p-3 font-semibold text-black">
                        {data.notes}
                      </div>
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
                </DialogDescription>
              </Card>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Page;
