import Avatar from '@material-ui/core/Avatar';
import './ViewListProfile.scss';
import { useContext, memo, useState } from 'react';
import AppContext from '../../../AppContext';
import Button from '@material-ui/core/Button';
import Settings from '../../Home/Settings';
import ViewListFriends from './ViewListFriends';

const ViewListProfile = memo(({ profilePicUrl, name, isSignedIn, setUser, isAlreadyFriends, viewId, addFriend }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sentRequest, setSentRequest] = useState(false);

    const onClickSendRequest = () => {
        setSentRequest(true);
        addFriend(viewId, "View list: main profile being viewed");
    };
    
    return (
        <div className='view-list-profile'>
            <Avatar className='profile-pic' src={profilePicUrl} alt='Profile pic' />
            <div className='profile-info'>
                <div className='profile-name'>{name}</div>
                {isSignedIn && !isAlreadyFriends && !sentRequest &&
                    <Button className='send-request-button' color='secondary' onClick={onClickSendRequest}>
                        Send friend request
                    </Button>
                }
                {isSignedIn && !isAlreadyFriends && sentRequest &&
                    <div className='sent-message'>Sent!</div>
                }
                {isSignedIn && isAlreadyFriends &&
                    <>
                        <Button className='view-friends-button' color='secondary' onClick={() => setIsModalOpen(true)}>
                            View friends
                        </Button>
                        <ViewListFriends viewId={viewId} isModalOpen={isModalOpen} onCloseModal={() => setIsModalOpen(false)} />
                    </>
                }
            </div>
            <Settings />
        </div>
    );
});

export default function ConnectedViewListProfile(props) {
    const { state, actions } = useContext(AppContext);
    const { user, friends } = state;

    const isSignedIn = !!user;
    const isAlreadyFriends = friends.findIndex(f => f.uid === props.viewId) > -1;

    const { addFriend } = actions;

    return (
        <ViewListProfile {...props} isSignedIn={isSignedIn} isAlreadyFriends={isAlreadyFriends} addFriend={addFriend} />
    );
}