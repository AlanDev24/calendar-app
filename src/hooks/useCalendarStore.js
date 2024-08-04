import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpadteEvent,
} from "../store";
import { calendarAPI } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //?actualizando
        const { data } = await calendarAPI.put(
          `/events/${calendarEvent.id}`,
          calendarEvent
        );
        dispatch(onUpadteEvent({ ...calendarEvent, user }));
        return;
      }
      //?creando
      const { data } = await calendarAPI.post("/events", calendarEvent);

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeleteEvent = async (id) => {
    //Todo llevar al backend
    try {
      await calendarAPI.delete(`/events/${id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      const { ok } = error.response.data;
      if (!ok) {
        Swal.fire("Error al eliminar", error.response.data.msg, "error");
      }
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarAPI.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //*properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*methods
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents,
  };
};
