"use client";
import { format, getWeek } from "date-fns";
import { Appointment } from "../../page";

const Appointments = ({ events }: { events: Appointment[] }) => {
  const date = new Date();
  const formattedDate = format(date, "yyyy-MM-dd");
  const week = getWeek(date);
  
  return (
    <div className="h-screen w-[500px] flex flex-col">
      <div className="border rounded-md w-full h-full flex flex-col overflow-hidden">
        <div className="flex justify-center items-center p-4 border-b shrink-0">
          <div className="font-bold pr-2">📍Weekly appointments</div>
          <div className="text-gray-500">
            {formattedDate}
          </div>
        </div>

        <div className="overflow-y-auto flex-grow p-5">
          {events
            ?.filter((user) => getWeek(user.startDate) === week)
            .map((user, index) => (
              <div key={index} className="mb-3">
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
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