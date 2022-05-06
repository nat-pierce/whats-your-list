import React from 'react';
import './AddToHomeScreenPopup.scss';
import appIcon from '../../Resources/Images/appIcon.png';
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import CloseIcon from '@material-ui/icons/Close';
import IosShareIcon from '../../Resources/Icons/IosShareIcon';

export default function AddToHomeScreenPopUp({ onClose }) {
    const bulletPoint = <CircleIcon className='bullet-point' fontSize='small' />;
    const iosShare = <IosShareIcon className='share-icon' fontSize='small' />;
    const closeIcon = <CloseIcon className='close-icon' fontSize='small' />;

    return (
        <div className='add-to-home-popup'>
            <span className='popup-arrow' />
            <img className='app-icon' src={appIcon} alt='app-icon' />
            <div className='instructions'>
                <div className='title'>
                    Add <span className='wyl'>WYL?</span> to home screen
                </div>
                <div className='step'>
                    {bulletPoint}
                    Tap {iosShare} at bottom of screen
                </div>
                <div className='step'>
                    {bulletPoint}
                    Tap <b>Add to Home Screen</b>
                </div>
                <div className='step'>
                    {bulletPoint}
                    Tap <b>Add</b> in top-right corner
                </div>
            </div>
            <div className='close-icon-wrapper' onClick={onClose}>
                {closeIcon}
            </div>
        </div>
    );
}