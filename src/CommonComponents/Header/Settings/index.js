import { memo, useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Settings.scss';
import { FirebaseContext } from "../../../Firebase";
import AppContext from "../../../AppContext";
import Modal from '../../Modal';
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';
import ProfilePic from '../../../Resources/Images/natProfilePic.jpg';

const Settings = memo(({ onClose, signOut, uid }) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [isViewingAbout, setIsViewingAbout] = useState(false);
    const [isChangingEmail, setIsChangingEmail] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    
    const onSignOut = () => {
        signOut(history);
        onClose();
    };

    const onCloseModal = () => {
        // If email or password has been changed, sign the user out
        if (successMessage) {
            onSignOut();
        } else {
            onClose();
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
                setSuccessMessage('Email set successfully');

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
                setSuccessMessage('Password set successfully');
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

    const errorMessage = hasError 
        ? <div className='error-message'>Please try again</div>
        : null;

    let settingsContent, modalTitle;
    if (successMessage) {
        modalTitle = 'Success';
        settingsContent = successMessage;
    } else if (isViewingAbout) {
        modalTitle = 'About';
        settingsContent = <About />;
    } else if (isChangingEmail) {
        modalTitle = 'Change Email';
        settingsContent = (
            <>
                {currentPasswordInput}
                <TextField
                    label="New email"
                    color="secondary"
                    variant="outlined" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)} />
                {errorMessage}
                <Button color="primary" variant="contained" onClick={onChangeEmail}>
                    Change email
                </Button>
            </>
        );
    } else if (isChangingPassword) {
        modalTitle = 'Change Password';
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
                {errorMessage}
                <Button color="primary" variant="contained" onClick={onChangePassword}>
                    Change password
                </Button>
            </>
        );
    } else {
        modalTitle = 'Settings';
        settingsContent = (
            <>
                <Button color="secondary" onClick={() => setIsViewingAbout(true)}>
                    About
                </Button>
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
            isOpen={true} 
            modalTitle={modalTitle} 
            className='settings-modal'>
            <div className='settings' key={modalTitle}>
                {settingsContent}
            </div>
        </Modal>
    );
});

function About() {
    return (
        <div className='about'>
            <div className='about-section'>
                <b>What's Your List?</b><br />is a passion project.
            </div>
            <div className='about-section'>
                If you're a fellow movie-lover, list-maker,<br />
                data-nerd, or all of the above (like me),<br />
                then this is the place for you.
            </div>
            <div className='about-section'>
                I hope you have as much fun using<br />
                this as I did making it. <span role="img">😊</span>
            </div>
            <div className='about-section'>
                And if you have suggestions for <br />
                how to improve <b>What's Your List?</b><br />
                don't hesitate to reach out to me at:
            </div>
            <a href={'mailto:nat@whatsyourlist.com'}>nat@whatsyourlist.com</a>
            <div className='signature'>
                -Nat
                <Avatar className='profile-pic' src={ProfilePic} />
            </div>
        </div>
    );
}

export default function ConnectedSettings({ onClose }) {
    const { state, actions } = useContext(AppContext);
    const { user } = state;
    const { signOut } = actions;

    return (
        <Settings 
            onClose={onClose}
            signOut={signOut} 
            uid={user?.uid} 
        />
    );
}