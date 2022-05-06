import React from 'react';
import './AddToHomeScreenPopup.scss';
import appIcon from '../../Resources/Images/appIcon.png';

export default function AddToHomeScreenPopUp() {
    return (
        <div className='add-to-home-popup'>
            <span className='popup-arrow' />
            <img className='app-icon' src={appIcon} alt='app-icon' />
            Add to home screen
        </div>
    );
}