import IconButton from '@material-ui/core/IconButton';
import { useState, memo } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import { downloadToFile } from './ShareUtilities';
import Modal from '../../../CommonComponents/Modal';
import './ShareModal.scss';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { BASE_URL } from '../../../Constants';
import IosShareIcon from '../../../Resources/Icons/IosShareIcon';

const ShareButton = memo(({ favoriteMovies, uid }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasCopiedLink, setHasCopiedLink] = useState(false);

    const shareLink = `${BASE_URL}/viewList?id=${uid}`;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSaveText = () => {
        let listText = 'WhatsYourList.com\n\n';

        favoriteMovies.forEach((movie, i) => {
            listText += `${i+1}. ${movie.Title}\n`
        })

        downloadToFile(listText, 'WhatsYourList.txt', 'text/plain');
    }

    const onShareLink = () => {
        setIsModalOpen(true);
    }

    const onCloseModal = () => {
        setIsModalOpen(false);
        setHasCopiedLink(false);
    }

    const onClickCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
        setHasCopiedLink(true);
    }

    return (
        <>
            <IconButton className='share-button' color='secondary' onClick={handleClick}>
                <IosShareIcon />
                Share list
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onShareLink}>Get shareable link</MenuItem>
                <MenuItem onClick={onSaveText}>Save list as text</MenuItem>
            </Menu>
            <Modal className='share-modal' isOpen={isModalOpen} onCloseModal={onCloseModal} modalTitle='Share list'>
                <div className='modal-content'>
                    <Button className='copy-button' onClick={onClickCopyLink}>
                        Copy
                    </Button>
                    <TextField 
                        value={shareLink}
                        variant='outlined'
                        color='secondary'
                    />
                </div>
                {hasCopiedLink &&
                    <div className='copy-message'>Copied to clipboard!</div>
                }
            </Modal>
        </>
    );
});

export default function ConnectedShareButton() {
    const { state } = useContext(AppContext);
    const { favoriteMovies, user } = state;
    const { uid } = user;

    return <ShareButton favoriteMovies={favoriteMovies} uid={uid} />;
}