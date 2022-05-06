import React from 'react';
import './AddToHomeScreenPopup.scss';
import appIcon from '../../Resources/Images/appIcon.png';
import CircleIcon from '@material-ui/icons/FiberManualRecord';

export default function AddToHomeScreenPopUp() {
    const bulletPoint = <CircleIcon fontSize='small' />

    return (
        <div className='add-to-home-popup'>
            <span className='popup-arrow' />
            <img className='app-icon' src={appIcon} alt='app-icon' />
            <div className='instructions'>
                <div className='title'>
                    Add WYL to home screen
                </div>
                <div className='step'>
                    {bulletPoint}
                    Tap icon at bottom of screen
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
        </div>
    );
}