"use client";

import { useEffect, useState } from "react";
import CalendarApp from "./calendar/page";
import { format } from "date-fns";
import Appointments from "./calendar/Appointments";

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
  notes: string[];
  updatedAt: string;
  createdAt: string;
};
export type Note = {
  id: string;
  bookTimeId: string;
  note: String;
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
      const formattedEvents: Event[] = data.map((appointment) => ({
        id: appointment.id,
        title: `${appointment.firstName} ${appointment.lastName}`,
        start: formatDate(appointment.startDate),
        end: formatDate(appointment.endDate),
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
        <div className="px-32 flex justify-center gap-8">
          <CalendarApp events={formattedEvents} />
          <Appointments events={fetchedEvents} />
        </div>
      )}
    </div>
  );
};
export default Page;
