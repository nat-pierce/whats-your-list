import React, { useState } from 'react';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

export default function CustomMenu({ menuOptions, menuButtonText, movie, index }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = !!anchorEl;

    const onClickOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onClose = () => {
        setAnchorEl(null);
    };

    const onClickOption = (option) => {
        option.onClick(movie, index);

        onClose();
    }
  
    return (
        <div className='custom-menu'>
            {menuButtonText
                ? <Button onClick={onClickOpen}>{menuButtonText}</Button>
                : <IconButton onClick={onClickOpen}><MoreHoriz /></IconButton>
            }
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={onClose}
            >
            {menuOptions.map((option, i) => (
                <MenuItem 
                    key={i} 
                    onClick={() => onClickOption(option)}
                    disabled={option.isDisabled}
                >
                    {option.label}
                </MenuItem>
            ))}
            </Menu>
        </div>
    );
}