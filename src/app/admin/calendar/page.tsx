"use client";

import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { CalendarEventExternal, createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import { useMemo, useState } from "react";
import { Event } from "../page";
import { AppointmentDetail } from "@/app/appointmentDetail/page";

function CalendarApp({ events }: { events: Event[] }) {
  const [selectedAppointment, setSelectedAppointment] =
    useState<CalendarEventExternal | null>(null);
  const eventsService = useMemo(() => createEventsServicePlugin(), []);

  const calendar = useNextCalendarApp({
    views: [createViewWeek()],
    events: events,
    plugins: [eventsService],
    callbacks: {
      onEventClick(event) {
        setSelectedAppointment(event as CalendarEventExternal);
      },
    },
  });
  const onClose = (_value: boolean) => {
    setSelectedAppointment(null);
  };
  console.log(selectedAppointment);
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
      {selectedAppointment && (
        <AppointmentDetail
          onOpenChange={onClose}
          selectedAppointment={selectedAppointment}
        />
      )}
      ;
    </div>
  );
}
export default CalendarApp;
