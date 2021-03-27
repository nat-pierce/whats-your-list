import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export default function Modal({ className = '', isOpen, children, onCloseModal, modalTitle }) {
    return (
        <Dialog className={`modal ${className}`} onClose={onCloseModal} open={isOpen}>
            <DialogTitle>{modalTitle}</DialogTitle>
            {children}
        </Dialog>
    );
}