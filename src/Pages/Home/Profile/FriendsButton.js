import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import { memo, useContext } from 'react';
import Badge from '@material-ui/core/Badge';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../Constants';
import AppContext from '../../../AppContext';

const FriendsButton = memo(({ numRequests, numFriends }) => {
    const history = useHistory();

    const onClick = () => {
        history.push(ROUTES.Friends);
    }

    return (
        <IconButton className='friends-button' variant="outlined" color="secondary" onClick={onClick}>
            <Badge badgeContent={numRequests} color="primary">
                {numFriends} <GroupIcon />
            </Badge>
        </IconButton>
    );
});

export default function ConnectedFriendsButton() {
    const { state } = useContext(AppContext);
    const { friendRequests, friends } = state;

    return <FriendsButton numRequests={friendRequests.length} numFriends={friends.length} />;
}