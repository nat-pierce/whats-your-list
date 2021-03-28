import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import './Modal.scss';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function Modal({ className = '', isOpen, children, onCloseModal, modalTitle }) {
    return (
        <Dialog 
            onClose={onCloseModal} 
            open={isOpen}
            classes={{
                paper: `modal ${className}`
            }}>
            <div className='modal-header'>
                <DialogTitle>{modalTitle}</DialogTitle>
                <IconButton className='close-icon' onClick={onCloseModal}>
                    <CloseIcon />
                </IconButton>
            </div>
            {children}
        </Dialog>
    );
}