import React from 'react';
import './SwitchChromePopup.scss';
import safariIcon from '../../Resources/Images/safariIcon.jpeg';
import CloseIcon from '@material-ui/icons/Close';

export default function SwitchChromePopUp({ onClose }) {
    const closeIcon = <CloseIcon className='close-icon' fontSize='small' />;

    return (
        <div className='switch-chrome-popup'>
            <img className='safari-icon' src={safariIcon} alt='Safari Icon' />
            <div className='message'>
                Switch to <b>Safari</b> for the best<br />
                experience on an iPhone <span className='emoji' role="img">😊</span>
            </div>
            <div className='close-icon-wrapper' onClick={onClose}>
                {closeIcon}
            </div>
        </div>
    );
}