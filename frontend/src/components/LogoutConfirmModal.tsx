import Modal from "./Modal"
import { useAuth } from "../contexts/AuthContext";
import { useCallback } from "react";
import { closeModal } from "../utils/modalUtil";

function LogoutConfirmModal({ modalID }: { modalID: string }) {
    const { logout } = useAuth();
    const closeLogoutModal = useCallback(() => closeModal(modalID), [modalID]);

    return (
        <Modal modalId={modalID}>
            <h3 className="text-lg font-bold">Logout?</h3>
            <div className="flex justify-end gap-2">
                <button className="btn btn-secondary" onClick={closeLogoutModal}>No</button>
                <button className="btn btn-primary" onClick={() => logout()}>Logout</button>
            </div>
        </Modal>
    )
}

export default LogoutConfirmModal