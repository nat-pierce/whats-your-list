import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import { useState, memo } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import { downloadToFile } from './ShareUtilities';

const ShareButton = memo(({ favoriteMovies }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSaveText = () => {
        let listText = '';

        favoriteMovies.forEach((movie, i) => {
            listText += `${i+1}. ${movie.Title}\n`
        })

        downloadToFile(listText, 'WhatsYourList.txt', 'text/plain');
    }

    const onSaveImage = () => {
        let listText = '';

        favoriteMovies.forEach((movie, i) => {
            listText += `${i+1}. ${movie.Title}\n`
        })

        downloadToFile(listText, 'WhatsYourList.txt', 'text/plain');
    }

    return (
        <>
            <IconButton color='secondary' onClick={handleClick}>
                <ShareIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onSaveImage}>Save list as image</MenuItem>
                <MenuItem onClick={onSaveText}>Save list as text</MenuItem>
            </Menu>
        </>
    );
});

export default function ConnectedShareButton() {
    const { state } = useContext(AppContext);
    const { favoriteMovies } = state;

    return <ShareButton favoriteMovies={favoriteMovies} />;
}