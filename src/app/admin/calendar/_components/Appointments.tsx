"use client";
import { format, getWeek } from "date-fns";
import { Appointment } from "../../page";

const Appointments = ({ events }: { events: Appointment[] }) => {
  const date = new Date();
  const formattedDate = format(date, "yyyy-MM-dd");
  const week = getWeek(date);
  const formatDateUTC = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  return (
    <div className="h-screen w-[500px] flex flex-col">
      <div className="border rounded-md w-full h-full flex flex-col overflow-hidden">
        <div className="flex justify-center items-center p-4 border-b shrink-0">
          <div className="font-bold pr-2">📍Weekly appointments</div>
          <div className="text-gray-500">{formattedDate}</div>
        </div>

        <div className="overflow-y-auto flex-grow p-5">
          {events
            ?.filter((user) => getWeek(user.startDate) === week)
            .map((user, index) => (
              <div key={index} className="mb-3">
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3 font-bold w-3/5 overflow-scroll no-scrollbar ">
                      <div>{user.firstName}</div>
                      <div>{user.lastName}</div>
                    </div>
                    <div className="text-gray-500">
                      {formatDateUTC(new Date(user.startDate))}
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
