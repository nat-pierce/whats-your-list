import React from 'react';
import './AddToHomeScreenPopup.scss';
import appIcon from '../../Resources/Images/appIcon.png';
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import IosShareIcon from '../../Resources/Icons/IosShareIcon';

export default function AddToHomeScreenPopUp() {
    const bulletPoint = <CircleIcon className='bullet-point' fontSize='small' />
    const iosShare = <IosShareIcon className='share-icon' />;

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
        </div>
    );
}