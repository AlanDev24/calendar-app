import { useState } from "react";
import { useCalendarStore } from "../../hooks";
import "./Fab.styles.css";
import Swal from "sweetalert2";

export const FabDelete = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    const del = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-4",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    del
      .fire({
        title: "¿Deseas eliminar este evento?",
        text: "Una vez borrado este desaparecerá!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "si, borrar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          startDeleteEvent();
          del.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          del.fire({
            title: "Cancelado",
            text: "No has borrado este evento :)",
            icon: "error",
          });
          
        }
      });
  };

  return (
    <button
      style={{
        display: hasEventSelected ? "block" : "none",
      }}
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
