import Button from '@material-ui/core/Button';
import { useState, memo, useContext } from 'react';
import Modal from '../../../../CommonComponents/Modal';
import './FriendsButton.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FindFriends from './FindFriends';
import FriendRequests from './FriendRequests';
import AppContext from '../../../../AppContext';
import Badge from '@material-ui/core/Badge';

const FriendsButton = memo(({ numRequests }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const numFriends = 0;

    let buttonText;
    if (numFriends === 0) {
        buttonText = "Add friends";
    } else if (numFriends === 1) {
        buttonText = "1 friend";
    } else {
        buttonText = `${numFriends} friends`;
    }

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

    return (
        <>  
            <Button className='friends-button' onClick={() => setIsModalOpen(true)}>
                <Badge badgeContent={numRequests} color="primary">
                    {buttonText}
                </Badge>
            </Button>
            <Modal 
                className='friends-modal' 
                modalTitle='Friends' 
                isOpen={isModalOpen}
                onCloseModal={() => setIsModalOpen(false)}>
                <Tabs
                    value={currentTab}
                    onChange={onChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                    >
                    <Tab label="Find friends" />
                    <Tab label={`Current friends (${numFriends})`} />
                    <Tab label={`Friend requests (${numRequests})`} />
                </Tabs>
                <TabPanel index={0}>
                    <FindFriends />
                </TabPanel>
                <TabPanel index={1}>
                    Tab 1
                </TabPanel>
                <TabPanel index={2}>
                    <FriendRequests />
                </TabPanel>
            </Modal>
        </>
    );
});

export default function ConnectedFriendsButton() {
    const { state } = useContext(AppContext);
    const { friendRequests } = state;

    return <FriendsButton numRequests={friendRequests.length} />;
}