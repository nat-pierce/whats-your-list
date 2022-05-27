import { useContext, memo, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import '../../Home/Profile/Profile.scss';
import AppContext from '../../../AppContext';
import Button from '@material-ui/core/Button';
import ViewListFriends from './ViewListFriends';
import { Tooltip } from '@material-ui/core';
import { getIsSignedIn } from '../../../AppSelectors';
import EditableLabel from '../../../CommonComponents/EditableLabel';

const ViewListProfile = memo(({ profilePicUrl, name, isSignedIn, setUser, isAlreadyFriends, viewId, addFriend }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sentRequest, setSentRequest] = useState(false);

    const onClickSendRequest = () => {
        setSentRequest(true);
        addFriend(viewId, "View list: main profile being viewed");
    };
    
    return (
        <div className='profile view-list-profile'>
            <Avatar className='profile-pic' src={profilePicUrl} alt='Profile pic' />
            <div className='profile-right'>
                <EditableLabel 
                    className='name'
                    initialValue={name}
                />
                <div className='buttons'>
                    {isSignedIn && !isAlreadyFriends && !sentRequest &&
                        <Button className='send-request-button' color='secondary' onClick={onClickSendRequest}>
                            Send friend request
                        </Button>
                    }
                    {!isSignedIn && 
                        <Tooltip title="Log in to add friends">
                            <span>
                                <Button className='send-request-button disabled' color='secondary' disabled={true} onClick={undefined}>
                                    Send friend request
                                </Button>
                            </span>
                        </Tooltip>
                    }
                    {isSignedIn && !isAlreadyFriends && sentRequest &&
                        <div className='sent-message'>Request sent</div>
                    }
                    {isSignedIn && isAlreadyFriends &&
                        <>
                            <Button className='view-friends-button' color='secondary' onClick={() => setIsModalOpen(true)}>
                                View Friends
                            </Button>
                            <ViewListFriends viewId={viewId} isModalOpen={isModalOpen} onCloseModal={() => setIsModalOpen(false)} />
                        </>
                    }
                </div>
            </div>
        </div>
    );
});

export default function ConnectedViewListProfile(props) {
    const { state, actions } = useContext(AppContext);
    const { friends } = state;

    const isSignedIn = getIsSignedIn(state);
    const isAlreadyFriends = friends.findIndex(f => f.uid === props.viewId) > -1;

    const { addFriend } = actions;

    return (
        <ViewListProfile 
            {...props} 
            isSignedIn={isSignedIn} 
            isAlreadyFriends={isAlreadyFriends} 
            addFriend={addFriend} 
        />
    );
}