import Avatar from '@material-ui/core/Avatar';
import './ViewListProfile.scss';
import { useContext, memo } from 'react';
import AppContext from '../../../AppContext';
import Button from '@material-ui/core/Button';
import Settings from '../../Home/Settings';
import Modal from '../../../CommonComponents/Modal';
import { useState } from 'react';
import ViewListFriends from './ViewListFriends';

const ViewListProfile = memo(({ profilePicUrl, name, isSignedIn, setUser, isAlreadyFriends, viewId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <div className='view-list-profile'>
            <Avatar className='profile-pic' src={profilePicUrl} alt='Profile pic' />
            <div className='profile-info'>
                <div className='profile-name'>{name}</div>
                {isSignedIn && !isAlreadyFriends &&
                    <Button className='send-request-button' color='secondary'>
                        Send friend request
                    </Button>
                }
                {isSignedIn && isAlreadyFriends &&
                    <>
                        <Button className='send-request-button' color='secondary' onClick={() => setIsModalOpen(true)}>
                            View friends
                        </Button>
                        <Modal modalTitle='View friends' isOpen={isModalOpen} onCloseModal={() => setIsModalOpen(false)}>
                            <ViewListFriends viewId={viewId} />
                        </Modal>
                    </>
                }
            </div>
            <Settings />
        </div>
    );
});

export default function ConnectedViewListProfile(props) {
    const { state } = useContext(AppContext);
    const { user, friends } = state;

    const isSignedIn = !!user;
    const isAlreadyFriends = friends.findIndex(f => f.uid === props.viewId) > -1;

    return (
        <ViewListProfile {...props} isSignedIn={isSignedIn} isAlreadyFriends={isAlreadyFriends} />
    );
}