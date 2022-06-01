import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import { memo, useContext } from 'react';
import Badge from '@material-ui/core/Badge';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../Constants';
import AppContext from '../../../AppContext';
import { getIsOnline } from '../../../Utilities/EnvironmentUtilities';

const FriendsButton = memo(({ numRequests, numFriends, isDisabled }) => {
    const history = useHistory();

    const onClick = () => {
        history.push(ROUTES.Friends);
    }

    return (
        <IconButton 
            className={`friends-button ${isDisabled ? 'disabled' : ''}`} 
            variant="outlined" 
            color="secondary" 
            onClick={onClick}
            disabled={isDisabled}
        >
            <Badge 
                badgeContent={numRequests} 
                color="primary" 
                overlap='rectangular'
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <GroupIcon />
            </Badge>
            {numFriends === 1
                ? '1 Friend'
                : `${numFriends} Friends`
            }
        </IconButton>
    );
});

export default function ConnectedFriendsButton() {
    const { state } = useContext(AppContext);
    const { friendRequests, friends } = state;

    const isOnline = getIsOnline();

    return <FriendsButton 
        isDisabled={!isOnline}
        numRequests={isOnline ? friendRequests.length : 0} 
        numFriends={friends.length} 
    />;
}