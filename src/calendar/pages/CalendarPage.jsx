import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessagesEs } from "../../helpers";
import { CalendarEvent, CalendarModal, NavBar } from "../";
import { useState } from "react";

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelect) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: "0.8",
      color: "white",
    };

    return {
      style,
    };
  };

  const events = [
    {
      title: "Cumpleaños de la bobi",
      notes: "Hay que comprarle un pastel de chocolate del magnolias",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "pink",
      user: {
        _id: 123,
        name: "Alan",
      },
    },
  ];

  const onDoubleClick = (event) => {
    console.log("double click");
  };

  const onSelect = (event) => {
    console.log("select");
  };

  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
  };

  return (
    <>
      <NavBar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
    </>
  );
};
