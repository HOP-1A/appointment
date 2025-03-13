"use client";

import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const getFunction = async () => {
    const bookedTime = await fetch("/api/weekly-appointment");
    console.log(bookedTime);
  };
  useEffect(() => {
    getFunction();
  }, []);
  const calendar = useNextCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2023-12-16",
        end: "2023-12-16",
      },
      {
        id: "1",
        title: "GG",
        start: "2025-03-16 03:00",
        end: "2025-03-16 04:00",
      },
    ],
    plugins: [eventsService],
    callbacks: {
      onRender: () => {
        // get all events
        eventsService.getAll();
      },
    },
  });

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
