import Button from '@material-ui/core/Button';
import { memo, useContext } from 'react';
import Badge from '@material-ui/core/Badge';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../Constants';
import AppContext from '../../../AppContext';

const FriendsButton = memo(({ numRequests, numFriends }) => {
    const history = useHistory();

    let buttonText;
    if (numFriends === 0) {
        buttonText = "Add friends";
    } else if (numFriends === 1) {
        buttonText = "1 friend";
    } else {
        buttonText = `${numFriends} friends`;
    }

    const onClick = () => {
        history.push(ROUTES.Friends);
    }

    return (
        <Button className='friends-button' onClick={onClick}>
            <Badge badgeContent={numRequests} color="primary">
                {buttonText}
            </Badge>
        </Button>
    );
});

export default function ConnectedFriendsButton() {
    const { state } = useContext(AppContext);
    const { friendRequests, friends } = state;

    return <FriendsButton numRequests={friendRequests.length} numFriends={friends.length} />;
}