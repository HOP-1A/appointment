"use client";
import { format } from "date-fns";
import { Appointment } from "../page";

const Appointments = ({ events }: { events: Appointment[] }) => {
  const date = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="border pb-4 rounded-md w-[570px] h-fit">
      <div className="pt-7 pb-2 font-bold pl-5">Today's appointments</div>
      <div className=" pb-5 pl-5 text-gray-500 ">{date.toString()}</div>
      <div className="pl-5">
        <div className="border rounded-md w-[450px] pl-3">
          {events?.map((user, index) => (
            <div key={index}>
              <div className="flex justify-between items-center p-2">
                <div className="flex space-x-3 font-bold">
                  <div>{user.firstName}</div>
                  <div>{user.lastName}</div>
                </div>
                <div className="text-gray-500">
                  {format(user.startDate, "yyyy-MM-dd hh:mm")}
                </div>

                <div className="text-center">
                  <div className=" flex justify-center items-center text-green-800 font-bold bg-green-300 border-green-950 rounded-xl text-sm pb-4 h-4 w-20 pt-4 ">
                    {user.reason}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Appointments;
