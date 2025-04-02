"use client";

import { useEffect, useState } from "react";
import Appointments from "./calendar/_components/Appointments";
import CalendarComponent from "./calendar/_components/CalendarComponent";

const formatDateUTC = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export type Appointment = {
  notes: Note[];
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
export type Note = {
  id: string;
  bookTimeId: string;
  note: string;
};

export type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
};

const Page = () => {
  const [fetchedEvents, setFetchedEvents] = useState<Appointment[]>([]);
  const [formattedEvents, setFormattedEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchAppointments() {
      const response = await fetch("/api/weekly-appointment");
      const data: Appointment[] = await response.json();

      setFetchedEvents(data);
      console.log(data);
      const formattedEvents: Event[] = data.map((appointment) => ({
        id: appointment.id,
        title: `${appointment.firstName} ${appointment.lastName}`,
        start: formatDateUTC(new Date(appointment.startDate)),
        end: formatDateUTC(new Date(appointment.endDate)),
        reason: appointment.reason,
        phoneNumber: appointment.phoneNumber,
        notes: appointment.notes,
      }));

      setFormattedEvents(formattedEvents);
    }

    fetchAppointments();
  }, []);

  return (
    <div>
      {fetchedEvents.length > 0 && (
        <div className="px-2 flex justify-center gap-2 h-screen">
          <CalendarComponent events={formattedEvents} />
          <Appointments events={fetchedEvents} />
        </div>
      )}
    </div>
  );
};
export default Page;
