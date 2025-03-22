"use client";
import { format } from "date-fns";
import { Appointment } from "../page";
const { getWeek } = require("date-fns");
const Appointments = ({ events }: { events: Appointment[] }) => {
  const date = format(new Date(), "yyyy-MM-dd");
  const week = getWeek(date);
  return (
    <div className="border pb-4 pr-4 rounded-md w-[500px] h-fit">
      <div className="flex justify-center items-center">
        <div className="pt-7 pb-2 font-bold pl-5">📍Weekly appointments</div>
        <div className=" pt-10 pb-5 pl-5 text-gray-500 ">{date.toString()}</div>
      </div>

      <div className="pl-5">
        <div>
          {events
            ?.filter((user) => getWeek(user.startDate) === week)
            .map((user, index) => (
              <div key={index} className="pt-3">
                <div className="border rounded-md w-[450px] pl-3">
                  <div className="flex justify-between items-center p-2">
                    <div className="flex space-x-3 font-bold">
                      <div>{user.firstName}</div>
                      <div>{user.lastName}</div>
                    </div>
                    <div className="text-gray-500">
                      {format(user.startDate, "yyyy-MM-dd hh:mm")}
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
