import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "./ModalStyles.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { addHours, differenceInSeconds } from "date-fns";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import { useCalendarStore, useUIStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const { closeDateModal } = useUIStore();

  const { isDateModalOpen } = useUIStore();

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const [formSubmitted, setformSubmitted] = useState(false);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onCloseModal = () => {
    closeDateModal();
    setformSubmitted(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setformSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }

    if (formValues.title.length <= 0) return;


    await startSavingEvent(formValues);
    //TODO cerrar modal
    closeDateModal();
    setformSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      contentLabel="Example Modal"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            onChange={(event) => onDateChange(event, "start")}
            selected={formValues.start}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale={es}
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            onChange={(event) => onDateChange(event, "end")}
            selected={formValues.end}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale={es}
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            onChange={onInputChange}
            autoComplete="off"
            value={formValues.title}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            onChange={onInputChange}
            value={formValues.notes}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
