import Modal from "./Modal"
import { useCallback } from "react";
import { closeModal } from "../utils/modalUtil";
import { useAuth } from "../contexts/AuthContext";

function ProfileModal({ modalID }: { modalID: string }) {
    const { user } = useAuth()
    const closeLogoutModal = useCallback(() => closeModal(modalID), [modalID]);

    return (
        <Modal modalId={modalID}>
            <h3 className="text-lg font-bold">Profile</h3>

            <div>
                <h5>{user?.name}</h5>
                <h5>{user?.email}</h5>
            </div>

            <div className="flex justify-end gap-2">
                <button className="btn btn-secondary" onClick={closeLogoutModal}>Close</button>
            </div>
        </Modal>
    )
}

export default ProfileModal