import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import './Modal.scss';

export default function Modal({ className = '', isOpen, children, onCloseModal, modalTitle }) {
    return (
        <Dialog 
            onClose={onCloseModal} 
            open={isOpen}
            classes={{
                paper: `modal ${className}`
            }}>
            <DialogTitle>{modalTitle}</DialogTitle>
            {children}
        </Dialog>
    );
}