import { useContext, memo } from 'react';
import AppContext from '../../../../../AppContext';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";

const CurrentFriends = memo(({ uid, friends }) => {
    return (
        <div className='current-friends'>
            {friends.map(friend => (
                <div className='request' key={friend.uid}>
                    <div className='profile-info'>
                        <Avatar className='profile-pic' src={friend.profilePicUrl} alt='Profile pic' />
                        <div className='name'>{friend.name}</div>
                    </div>
                    <div className='button-section'>
                        <Button>
                            Remove friend
                        </Button>
                        <Button className="view-button" variant="contained" color="secondary">
                            View list
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default function ConnectedCurrentFriends() {
    const { state, actions } = useContext(AppContext);
    const { user, friends } = state;
    const { uid } = user;

    return (
        <CurrentFriends
            uid={uid} 
            friends={friends} />
    );
}