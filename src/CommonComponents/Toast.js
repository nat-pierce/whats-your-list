import React, { memo, useState, useEffect, useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AppContext from '../AppContext';

const Toast = memo(({ toastMessage }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    }, [toastMessage])

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setIsOpen(false);
    };

    if (!toastMessage) { 
        return null 
    }

    return (
        <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                {toastMessage}
            </Alert>
        </Snackbar>
    )
});

export default function ConnectedToast() {
    const { state } = useContext(AppContext);
    const { toastMessage } = state;

    return <Toast toastMessage={toastMessage} />;
}