import { addHours } from "date-fns";
import { useCalendarStore, useUIStore } from "../../hooks";
import "./Fab.styles.css";

export const FabAddNew = () => {
  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClick = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "pink",
      user: {
        _id: 123,
        name: "Alan",
      },
    });
    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
