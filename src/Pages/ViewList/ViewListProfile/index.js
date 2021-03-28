import Avatar from '@material-ui/core/Avatar';
import './ViewListProfile.scss';
import { useContext, memo } from 'react';
import AppContext from '../../../AppContext';
import Button from '@material-ui/core/Button';
import Settings from '../../Home/Settings';

const ViewListProfile = memo(({ profilePicUrl, name, isSignedIn, setUser }) => {
    return (
        <div className='view-list-profile'>
            <Avatar className='profile-pic' src={profilePicUrl} alt='Profile pic' />
            <div className='profile-info'>
                <div className='profile-name'>{name}</div>
                {isSignedIn && 
                    <Button className='send-request-button' color='secondary'>
                        Send friend request
                    </Button>
                }
            </div>
            <Settings />
        </div>
    );
});

export default function ConnectedViewListProfile(props) {
    const { state } = useContext(AppContext);
    const { user } = state;

    const isSignedIn = !!user;

    return (
        <ViewListProfile {...props} isSignedIn={isSignedIn} />
    );
}