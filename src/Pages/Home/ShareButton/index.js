import IconButton from '@material-ui/core/IconButton';
import { useState, useEffect, memo } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import { downloadToFile } from './ShareUtilities';
import Modal from '../../../CommonComponents/Modal';
import './ShareModal.scss';
import { TextField } from '@material-ui/core';
import { BASE_URL } from '../../../Constants';
import IosShareIcon from '../../../Resources/Icons/IosShareIcon';

const ShareButton = memo(({ favoriteMovies, uid }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const shareLink = `${BASE_URL}/viewList?id=${uid}`;

    useEffect(() => {
        if (isModalOpen) {
            navigator.clipboard.writeText(shareLink);
        }
    }, [isModalOpen, shareLink]);

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
                <MenuItem onClick={onShareLink}>
                    <b>Share my list</b>
                </MenuItem>
                <MenuItem onClick={onSaveText}>
                    Download text
                </MenuItem>
            </Menu>
            <Modal className='share-modal' isOpen={isModalOpen} onCloseModal={onCloseModal} modalTitle='Share list'>
                <div className='modal-content'>
                    <TextField 
                        value={shareLink}
                        variant='outlined'
                        color='secondary'
                    />
                </div>
                <div className='copy-message'>Copied to clipboard!</div>
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