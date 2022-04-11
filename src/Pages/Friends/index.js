import FindFriends from './FindFriends';
import FriendRequests from './FriendRequests';
import CurrentFriends from './CurrentFriends';
import AppContext from '../../AppContext';
import { useContext, memo, useEffect } from 'react';
import './Friends.scss';
import Header from '../../CommonComponents/Header';
import { useHistory } from 'react-router';
import { ROUTES } from '../../Constants';
import Badge from '@material-ui/core/Badge';
import CustomTabs from '../../CommonComponents/CustomTabs';

const Friends = memo(({ user, numFriends, numRequests }) => {
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            history.push(ROUTES.Login);
        }
    }, [user, history]);

    if (!user) {
        return null;
    }

    const tabConfigs = [
        { 
            label: `Current friends (${numFriends})`,
            component: <CurrentFriends />
        },
        {
            label: "Find new friends",
            component: <FindFriends />
        },
        {
            label: <Badge badgeContent={numRequests} color="primary">Friend requests</Badge>,
            component: <FriendRequests />
        }
    ];

    return (
        <div className='friends-page'>
            <Header />
            <CustomTabs tabConfigs={tabConfigs} />
        </div>
    )
});

export default function ConnectedFriends() {
    const { state } = useContext(AppContext);
    const { friendRequests, friends, user } = state;

    return <Friends user={user} numRequests={friendRequests.length} numFriends={friends.length} />;
}