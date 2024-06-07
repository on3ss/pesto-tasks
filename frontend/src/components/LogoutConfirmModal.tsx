import Modal from "./Modal"
import { useAuth } from "../contexts/AuthContext";
import { useCallback } from "react";
import { closeModal } from "../utils/modalUtil";

function LogoutConfirmModal({ modalID }: { modalID: string }) {
    const { logout } = useAuth();
    const closeLogoutModal = useCallback(() => closeModal(modalID), [modalID]);

    return (
        <Modal modalId={modalID}>
            <h5 className="text-lg font-bold">Logout</h5>
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-end gap-2 my-4">
                <button className="btn btn-secondary" onClick={closeLogoutModal}>No</button>
                <button className="btn btn-primary" onClick={() => logout()}>Logout</button>
            </div>
        </Modal>
    )
}

export default LogoutConfirmModal