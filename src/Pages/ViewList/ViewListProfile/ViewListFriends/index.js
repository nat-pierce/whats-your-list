import { useEffect, useState, useContext, memo } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { getFriendsInfo } from '../../../../FirebaseFunctions';
import './ViewListFriends.scss';
import Modal from '../../../../CommonComponents/Modal';
import AppContext from '../../../../AppContext';
import Button from '@material-ui/core/Button';

const ViewListFriends = memo(({ uid, viewId, isModalOpen, onCloseModal, addFriend }) => {
    const [viewListFriends, setViewListFriends] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);

    const onClickAddFriend = (id) => {
        setSentRequests([...sentRequests, id]);
        addFriend(id, "View list: friend of a friend");
    }

    useEffect(() => {
        if (viewListFriends.length) { return };

        getFriendsInfo(viewId).then((response) => {
            if (response) {
                setViewListFriends(response.friends);
            }
        })
    }, [viewListFriends, setViewListFriends, viewId, uid]);
    
    return (
        <Modal className='view-friends-modal' modalTitle={`View friends (${viewListFriends.length})`} isOpen={isModalOpen} onCloseModal={onCloseModal}>
            <div className='view-list-friends'>
                { viewListFriends.map(friend => (
                    <div className='friend' key={friend.uid}>
                        <div className='profile-info'>
                            <Avatar className='profile-pic' src={friend.profilePicUrl} alt='Profile pic' />
                            <div className='name'>{friend.name}</div>
                        </div>
                        {friend.uid !== uid && sentRequests.includes(friend.uid) &&
                            <div>Sent request</div>
                        }
                        {friend.uid !== uid && !sentRequests.includes(friend.uid) &&
                            <Button className='add-button' onClick={() => onClickAddFriend(friend.uid)}>
                                Add
                            </Button>
                        }
                    </div>
                ))}
            </div>
        </Modal>
    );
});

export default function ConnectedViewListFriends(props) {
    const { state, actions } = useContext(AppContext);
    const { addFriend } = actions;
    const uid = state.user.uid;

    return <ViewListFriends addFriend={addFriend} uid={uid} {...props} />;
}