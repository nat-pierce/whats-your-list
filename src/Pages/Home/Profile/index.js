import './Profile.scss';
import { useContext, memo, useRef } from 'react';
import AppContext from '../../../AppContext';
import Avatar from '@material-ui/core/Avatar';
import { FirebaseContext } from '../../../Firebase';
import EditableLabel from '../../../CommonComponents/EditableLabel';
import FriendsButton from './FriendsButton';
import ShareButton from '../ShareButton';
import { getFirstAndLastName } from '../../../Utilities/CommonUtilities';

const Profile = memo(({ uid, name, profilePicUrl }) => {
    const profilePicInputRef = useRef(null);
    const firebase = useContext(FirebaseContext);

    const onClickProfilePic = () => {
        profilePicInputRef.current.click()
    };

    const onProfilePicChange = (e) => {
        const [file] = e.target.files;

        if (file) {
            const storageRef = firebase.storage().ref();
            const imageRef = storageRef.child(`profilePics/${uid}`);
            imageRef.put(file)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then(url => {
                        firebase.firestore().collection('publicUserInfo').doc(uid).update({
                            profilePicUrl: url
                        });
                    });
                })
                .catch((error) => {
                    console.error('setProfilePic error:', error);
                });
        }
    }

    const onConfirmName = (name) => {
        const [firstName, lastName] = getFirstAndLastName(name);

        firebase.firestore().collection('publicUserInfo').doc(uid).update({ 
            name,
            firstName,
            lastName 
        });
        firebase.auth().currentUser.updateProfile({
            displayName: name
        });
    }

    if (!uid || !name) {
        return null; // need to make sure EditableLabel doesn't get an initial null value
    }

    return (
        <div className='profile'>
            <div className='profile-pic-wrapper' onClick={onClickProfilePic}>
                <Avatar className='profile-pic' src={profilePicUrl} alt='Profile pic' />
                <input 
                    ref={profilePicInputRef} 
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={onProfilePicChange} 
                    style={{ display: 'none' }}
                />
            </div>
            <div className='profile-right'>
                <EditableLabel 
                    className='name'
                    initialValue={name}
                    onConfirm={onConfirmName}
                />
                <div className='buttons'>
                    <FriendsButton />
                    <ShareButton />
                </div>
            </div>
        </div>
    )
});

export default function ConnectedProfile() {
    const { state } = useContext(AppContext);
    const { user, publicUserInfo } = state;
    const uid = user && user.uid;
    const name = publicUserInfo && publicUserInfo.name;
    const profilePicUrl = publicUserInfo && publicUserInfo.profilePicUrl;

    return <Profile uid={uid} name={name} profilePicUrl={profilePicUrl} />
}