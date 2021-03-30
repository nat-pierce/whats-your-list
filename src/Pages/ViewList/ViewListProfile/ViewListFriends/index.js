import { useEffect } from 'react';
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { getFriendsInfo } from '../../../../FirebaseFunctions';
import './ViewListFriends.scss';
import Modal from '../../../../CommonComponents/Modal';

export default function ViewListFriends({ viewId, isModalOpen, onCloseModal }) {
    const [viewListFriends, setViewListFriends] = useState([]);

    useEffect(() => {
        if (viewListFriends.length) { return };

        getFriendsInfo(viewId).then(({ result }) => {
            setViewListFriends([...result, ...result, ...result, ...result, ...result]);
        })
    }, [viewListFriends, setViewListFriends, viewId]);
    
    return (
        <Modal className='view-friends-modal' modalTitle={`View friends (${viewListFriends.length})`} isOpen={isModalOpen} onCloseModal={onCloseModal}>
            <div className='view-list-friends'>
                { viewListFriends.length &&
                    viewListFriends.map(friend => (
                        <div className='friend' key={friend.uid}>
                            <div className='profile-info'>
                                <Avatar className='profile-pic' src={friend.profilePicUrl} alt='Profile pic' />
                                <div className='name'>{friend.name}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Modal>
    );
}