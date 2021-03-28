import Button from '@material-ui/core/Button';
import { useState } from 'react';
import Modal from '../../../../CommonComponents/Modal';
import './FriendsButton.scss';

export default function FriendsButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const numFriends = 0;
    const friendCode = 'asdjfkls;j'

    let buttonText;
    if (numFriends === 0) {
        buttonText = "Add friends";
    } else if (numFriends === 1) {
        buttonText = "1 friend";
    } else {
        buttonText = `${numFriends} friends`;
    }

    return (
        <>
            <Button className='friends-button' onClick={() => setIsModalOpen(true)}>
                {buttonText}
            </Button>
            <Modal 
                className='friends-modal' 
                modalTitle='Friends' 
                isOpen={isModalOpen} 
                onCloseModal={() => setIsModalOpen(false)}>
                <div className='upper'>
                    <div>My friend code:
                        <span className='friend-code'>{friendCode}</span>
                    </div>
                </div>
            </Modal>
        </>
    );
}