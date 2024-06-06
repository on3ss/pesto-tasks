import { useMemo } from "react";

export function useModal(id: string) {
    return useMemo(() => id, [id]);
}

export function showModal(modalID: string) {
    const modal = document.getElementById(modalID) as HTMLDialogElement;
    if (modal) {
        modal.showModal();
    }
}

export function closeModal(modalID: string) {
    const modal = document.getElementById(modalID) as HTMLDialogElement;
    if (modal) {
        modal.close();
    }
}