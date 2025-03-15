"use client";
import { use, useEffect, useState } from "react";

type Appointment = {
  id: string;
  firstName: string;
  lastName: string;
  startDate: string;
  reason: string;
};

const Appointments = () => {
  const [appoints, setAppoints] = useState<Appointment[] | null>(null);
  const getFunction = async () => {
    const appoint = await fetch("/api/weekly-appointment");
    setAppoints(await appoint.json());
  };
  useEffect(() => {
    getFunction();
  }, []);

  const date = new Date();
  return (
    <div className="border pb-4 rounded-md w-[570px]">
      <div className="pt-7 pb-2 font-bold pl-5">Today's appointments</div>
      <div className=" pb-5 pl-5 text-gray-500 ">{date.toString()}</div>
      <div className="pl-5">
        <div className="border rounded-md w-[450px] pl-3">
          {appoints?.map((user, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <div>
                  <div className="flex space-x-3 font-bold">
                    <div>{user.firstName}</div>
                    <div>{user.lastName}</div>
                  </div>
                  <div className="text-gray-500">{user.startDate}</div>
                </div>

                <div className="pt-2 pr-5">
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
