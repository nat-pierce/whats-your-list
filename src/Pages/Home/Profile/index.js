import './Profile.scss';
import { useContext, memo, useRef } from 'react';
import AppContext from '../../../AppContext';
import Avatar from '@material-ui/core/Avatar';
import { FirebaseContext } from '../../../Firebase';

const Profile = memo(({ uid, profilePicUrl }) => {
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
                        firebase.firestore().collection('users').doc(uid).update({
                            profilePicUrl: url
                        });
                    });
                })
                .catch((error) => {
                    console.error('setProfilePic error:', error);
                });
        }
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
        </div>
    )
});

export default function ConnectedProfile() {
    const { state } = useContext(AppContext);
    const { user } = state;
    const { uid, profilePicUrl } = user;

    return <Profile uid={uid} profilePicUrl={profilePicUrl} />
}