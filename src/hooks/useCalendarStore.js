import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpadteEvent } from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO llegar al backend

    //Todo bien
    if (calendarEvent._id) {
      //?actualizando
      dispatch(onUpadteEvent({ ...calendarEvent }));
    } else {
      //?creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeleteEvent = () => {

    //Todo llevar al backend
    dispatch(onDeleteEvent())
  }

  return {
    //*properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*methods
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent
  };
};
