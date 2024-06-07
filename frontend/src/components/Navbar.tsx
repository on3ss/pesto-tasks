import { useCallback } from "react";
import { showModal, useModal } from "../utils/modalUtil";
import LogoutConfirmModal from "./LogoutConfirmModal";
import ProfileModal from "./ProfileModal";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
    const { user } = useAuth()
    const confirmLogoutModal = useModal('confirm-logout-modal');
    const profileModal = useModal('profile-modal');
    const showConfirmLogoutModal = useCallback(() => showModal(confirmLogoutModal), [confirmLogoutModal]);
    const showProfileModal = useCallback(() => showModal(profileModal), [profileModal]);
    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 w-full bg-primary text-primary-content">
                <div className="mx-auto md:w-2/3 xl:w-1/2">
                    <div className="navbar">
                        <div className="flex-1">
                            <a className="text-xl btn btn-ghost">taskMN</a>
                        </div>
                        <nav className="flex-none gap-2">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={`https://ui-avatars.com/api/?name=${user?.name}`} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52 text-base-content">
                                    <li>
                                        <a onClick={showProfileModal}>Profile</a>
                                    </li>
                                    <li><a onClick={showConfirmLogoutModal}>Logout</a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <LogoutConfirmModal modalID={confirmLogoutModal} />
            <ProfileModal modalID={profileModal} />
        </>
    )
}

export default Navbar