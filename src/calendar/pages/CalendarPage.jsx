import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessagesEs } from "../../helpers";
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  NavBar,
} from "../";
import { useEffect, useState } from "react";
import { useUIStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {
  const { openDateModal } = useUIStore();

  const { events, setActiveEvent, startLoadingEvents, activeEvent } = useCalendarStore();
  const { user } = useAuthStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelect) => {
    const isMyEvent = user.uid === event.user._id || user.uid === event.user.id;

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : '#465660',
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
    setLastView(lastView);
    localStorage.setItem("lastView", event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

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
      <FabAddNew />
      <FabDelete />
    </>
  );
};
