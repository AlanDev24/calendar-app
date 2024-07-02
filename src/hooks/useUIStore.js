import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenDateModal } from "../store";

export const useUIStore = () => {

    const dispatch = useDispatch()


    const { isDateModalOpen } = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseModal());
    }

    return {
        //*properties
        isDateModalOpen,

        //*methods
        openDateModal,
        closeDateModal
    }
}