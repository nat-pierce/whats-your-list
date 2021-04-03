import { useContext, memo, useState } from 'react';
import AppContext from '../../AppContext';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router';
import { ROUTES } from '../../Constants';
import Modal from '../../CommonComponents/Modal';

const CurrentFriends = memo(({ uid, friends, removeFriend }) => {
    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [removeId, setRemoveId] = useState(null);

    const onClickViewList = (id) => {
        history.push(`${ROUTES.ViewList}?id=${id}`);
    };

    const onClickRemove = (id) => {
        setRemoveId(id);
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
        setRemoveId(null);
    };

    const onConfirmRemove = () => {
        removeFriend(removeId);
        onCloseModal();
    };

    return (
        <div className='current-friends'>
            {friends.map(friend => (
                <div className='friend' key={friend.uid}>
                    <div className='profile-info'>
                        <Avatar className='profile-pic' src={friend.profilePicUrl} alt='Profile pic' />
                        <div className='name'>{friend.name}</div>
                    </div>
                    <div className='button-section'>
                        <Button className="remove-button" onClick={() => onClickRemove(friend.uid)}>
                            Remove
                        </Button>
                        <Button className="view-button" variant="contained" color="secondary" onClick={() => onClickViewList(friend.uid)}>
                            View list
                        </Button>
                    </div>
                </div>
            ))}
            <Modal className='remove-modal' isOpen={isModalOpen} modalTitle='Are you sure?' onCloseModal={onCloseModal}>
                <div className='button-section'>
                    <Button onClick={onCloseModal}>Cancel</Button>
                    <Button 
                        onClick={() => onConfirmRemove()} 
                        variant='contained' 
                        color='secondary' 
                        className='confirm-button'>
                        Yes, remove friend
                    </Button>
                </div>
            </Modal>
        </div>
    );
});

export default function ConnectedCurrentFriends() {
    const { state, actions } = useContext(AppContext);
    const { user, friends } = state;
    const { uid } = user;
    const { removeFriend } = actions;

    return (
        <CurrentFriends
            uid={uid} 
            friends={friends}
            removeFriend={removeFriend} />
    );
}