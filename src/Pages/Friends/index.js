import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FindFriends from './FindFriends';
import FriendRequests from './FriendRequests';
import CurrentFriends from './CurrentFriends';
import AppContext from '../../AppContext';
import { useState, useContext, memo, useEffect } from 'react';
import './Friends.scss';
import Header from '../../CommonComponents/Header';
import { useHistory } from 'react-router';
import { ROUTES } from '../../Constants';
import Badge from '@material-ui/core/Badge';

const Friends = memo(({ user, numFriends, numRequests }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            history.push(ROUTES.Login);
        }
    }, [user, history]);
    
    const onChangeTab = (event, newTab) => {
        setCurrentTab(newTab);
    };

    const TabPanel = ({ index, children }) => {
        if (index !== currentTab) {
            return null;
        }

        return (
            <div className='tab-panel'>
                {children}
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className='friends-page'>
            <Header />
            <Tabs
                value={currentTab}
                onChange={onChangeTab}
                indicatorColor="secondary"
                textColor="secondary"
                variant="fullWidth"
                >
                <Tab label={`Current friends (${numFriends})`} />
                <Tab label="Find new friends" />
                <Tab label={
                    <Badge badgeContent={numRequests} color="primary">
                        Friend requests
                    </Badge>
                } />
            </Tabs>
            <TabPanel index={0}>
                <CurrentFriends />
            </TabPanel>
            <TabPanel index={1}>
                <FindFriends />
            </TabPanel>
            <TabPanel index={2}>
                <FriendRequests />
            </TabPanel>
        </div>
    )
});

export default function ConnectedFriends() {
    const { state } = useContext(AppContext);
    const { friendRequests, friends, user } = state;

    return <Friends user={user} numRequests={friendRequests.length} numFriends={friends.length} />;
}