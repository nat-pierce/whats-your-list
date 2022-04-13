import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function CustomMenu({ menuOptions, movie, index }) {
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
            <IconButton onClick={onClickOpen}>
                <MoreHoriz />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={onClose}
            >
            {menuOptions.map((option, index) => (
                <MenuItem 
                    key={index} 
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