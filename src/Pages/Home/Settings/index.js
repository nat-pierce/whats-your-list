import { memo, useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Settings.scss';
import { FirebaseContext } from "../../../Firebase";
import AppContext from "../../../AppContext";
import Modal from '../../../CommonComponents/Modal';
import TextField from "@material-ui/core/TextField";

const Settings = memo(({ signOut, isSettingsModalOpen, setIsSettingsModalOpen, uid }) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [isChangingEmail, setIsChangingEmail] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    
    const onSignOut = () => {
        signOut(history);
    };

    const onCloseModal = () => {
        setIsSettingsModalOpen(false);
        setCurrentPassword('');
        setNewEmail('');
        setIsChangingEmail(false);
        setIsChangingPassword(false);
        setHasError(false);

        if (successMessage) {
            setSuccessMessage(null);
            onSignOut(history);
        }
    }

    const reauthenticate = (currentPassword) => {
        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        
        return user.reauthenticateWithCredential(cred);
    };

    const onChangeEmail = () => {
        reauthenticate(currentPassword).then(() => {
            const user = firebase.auth().currentUser;
            user.updateEmail(newEmail).then(() => {
                setSuccessMessage('Email changed!');

                firebase.firestore()
                    .collection('users')
                    .doc(uid)
                    .update({ email: newEmail });
            }).catch((error) => { console.log(error); setHasError(true) });
        }).catch((error) => { console.log(error); setHasError(true) });
    };

    const onChangePassword = () => {
        reauthenticate(currentPassword).then(() => {
            const user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {
                setSuccessMessage('Password changed!');
            }).catch((error) => { console.log(error); setHasError(true) });
        }).catch((error) => { console.log(error); setHasError(true) });
    };

    const currentPasswordInput = (
        <TextField
            type="password"
            label="Current password"
            color="secondary"
            variant="outlined" 
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)} />
    );

    let settingsContent;
    if (successMessage) {
        settingsContent = (
            <div>{successMessage}</div>
        )
    } else if (isChangingEmail) {
        settingsContent = (
            <>
                {currentPasswordInput}
                <TextField
                    label="New email"
                    color="secondary"
                    variant="outlined" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)} />
                {hasError && <div className='error-message'>Please try again</div>}
                <Button color="primary" variant="contained" onClick={onChangeEmail}>
                    Change email
                </Button>
            </>
        );
    } else if (isChangingPassword) {
        settingsContent = (
            <>
                {currentPasswordInput}
                <TextField
                    type="password"
                    label="New password"
                    color="secondary"
                    variant="outlined" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} />
                {hasError && <div className='error-message'>Please try again</div>}
                <Button color="primary" variant="contained" onClick={onChangePassword}>
                    Change password
                </Button>
            </>
        );
    } else {
        settingsContent = (
            <>
                <Button color="secondary" onClick={() => setIsChangingEmail(true)}>
                    Change email
                </Button>
                <Button color="secondary" onClick={() => setIsChangingPassword(true)}>
                    Change password
                </Button>
                <Button color="primary" variant="contained" onClick={onSignOut}>
                    Sign Out
                </Button>
            </>
        );
    }

    return (
        <Modal 
            onCloseModal={onCloseModal}
            isOpen={isSettingsModalOpen} 
            modalTitle='Settings' 
            className='settings-modal'>
            <div className='settings'>
                {settingsContent}
            </div>
        </Modal>
    );
});

export default function ConnectedSettings() {
    const { state, actions } = useContext(AppContext);
    const { isSettingsModalOpen, user } = state;
    const { signOut, setIsSettingsModalOpen } = actions;

    return (
        <Settings 
            signOut={signOut} 
            isSettingsModalOpen={isSettingsModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            uid={user && user.uid} />
    );
}