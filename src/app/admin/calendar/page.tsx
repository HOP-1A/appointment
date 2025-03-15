"use client";

import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import { useMemo } from "react";
import { Event } from "../page";

function CalendarApp({ events }: { events: Event[] }) {
  const eventsService = useMemo(() => createEventsServicePlugin(), []);

  const calendar = useNextCalendarApp({
    views: [createViewWeek()],
    events: events,
    plugins: [eventsService],
  });

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
