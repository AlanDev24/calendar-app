import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessagesEs } from "../../helpers";
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../";
import { useState } from "react";
import { useUIStore, useCalendarStore } from "../../hooks";

export const CalendarPage = () => {
  const { openDateModal } = useUIStore();

  const { events, setActiveEvent } = useCalendarStore();

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

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChange = (event) => {
    setLastView(lastView)
    localStorage.setItem('lastView', event)
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
      <FabAddNew/>
      <FabDelete/>
    </>
  );
};
