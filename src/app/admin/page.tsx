"use client";

import { useEffect, useState } from "react";
import CalendarApp from "./calendar/page";
import { format } from "date-fns";

const formatDate = (dateString: Date) => {
  return format(dateString, "yyyy-MM-dd hh:mm");
};

export type Appointment = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  reason: string;
  startDate: Date;
  endDate: Date;
  updatedAt: string;
  createdAt: string;
};

export type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
};

const Page = () => {
  const [fetchedEvents, setFetchedEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchAppointments() {
      const response = await fetch("/api/weekly-appoinment");
      const data: Appointment[] = await response.json();

      const formattedEvents: Event[] = data.map((appointment) => ({
        id: appointment.id,
        title: `${appointment.firstName} ${appointment.lastName}`,
        start: formatDate(appointment.startDate),
        end: formatDate(appointment.endDate),
      }));
      console.log(formattedEvents);
      setFetchedEvents(formattedEvents);
    }

    fetchAppointments();
  }, []);
  return (
    <div>
      {fetchedEvents.length > 0 && <CalendarApp events={fetchedEvents} />}
    </div>
  );
};
export default Page;
