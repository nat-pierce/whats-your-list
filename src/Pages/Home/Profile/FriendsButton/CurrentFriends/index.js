import { useContext, memo } from 'react';
import AppContext from '../../../../../AppContext';
import Avatar from '@material-ui/core/Avatar';
import './FriendRequests.scss';
import Button from "@material-ui/core/Button";

const FriendRequests = memo(({ uid, currentFriends }) => {
    return (
        <div className='friend-requests'>
            {currentFriends.map(friend => (
                <div className='request' key={friend.uid}>
                    <div className='profile-info'>
                        <Avatar className='profile-pic' src={request.profilePicUrl} alt='Profile pic' />
                        <div className='name'>{request.name}</div>
                    </div>
                    <div className='button-section'>
                        <Button onClick={() => deleteFriendRequest(request.uid)}>
                            Remove friend
                        </Button>
                        <Button onClick={() => acceptFriendRequest(request.uid)} className="accept-button" variant="contained" color="secondary">
                            View list
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default function ConnectedFriendRequests() {
    const { state, actions } = useContext(AppContext);
    const { user, friendRequests } = state;
    const { uid } = user;
    const { removeFriend, viewList } = actions;

    return (
        <FriendRequests 
            uid={uid} 
            friendRequests={friendRequests} 
            acceptFriendRequest={acceptFriendRequest} 
            deleteFriendRequest={deleteFriendRequest} />
    );
}