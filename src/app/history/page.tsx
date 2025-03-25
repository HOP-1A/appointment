"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Appointment } from "../admin/page";
const History = () => {
  const { user } = useUser();
  const [myHistory, setMyHistory] = useState<Appointment[]>([]);
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
  return (
    <>
      {myHistory.length === 0 ? (
        <div className="text-2xl font-black text-[#1f5090] flex justify-center items-center h-screen ">
          LOADING...
        </div>
      ) : (
        <div>
          <div
            className=" pl-10 font-bold text-4xl text-[#1f5090]"
            onClick={redirectToHome}>
            Team3 Dental Clinic
          </div>
          <div className=" flex flex-col items-center ">
            <div className=" rounded-t-lg font-bold text-xl bg-[#1f5090] w-[700px] flex justify-center items-center text-white p-3">
              Миний цаг авсан түүх
            </div>
            {myHistory
              .filter((history) => history.userId === user?.id)
              .map((history, index) => (
                <div key={index}>
                  <div className="flex space-x-4 justify-between border p-4 w-[700px]">
                    <div className="flex space-x-1.5">
                      <div>{history.firstName}</div>
                      <div>{history.lastName}</div>
                    </div>

                    <div>{history.reason}</div>
                    <div className="flex">
                      <div>{format(history.startDate, "yyyy-MM-dd hh:mm")}</div>
                      <div>{format(history.endDate, "hh:mm")}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default History;
