import { ModalProps } from "../types"

function Modal({ children, modalId }: ModalProps) {
    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default Modal