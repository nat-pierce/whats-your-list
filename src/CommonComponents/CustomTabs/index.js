import React, { useState, memo } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './CustomTabs.scss';

const CustomTabs = memo(({ tabConfigs }) => {
    const [currentTab, setCurrentTab] = useState(0);

    const onChangeTab = (event, newTab) => {
        setCurrentTab(newTab);
    };

    const TabPanel = ({ value, children }) => {
        if (value !== currentTab) {
            return null;
        }

        return (
            <div className='tab-panel'>
                {children}
            </div>
        );
    }

    return (
        <div className='tabs-container'>
            <Tabs
                value={currentTab}
                onChange={onChangeTab}
                indicatorColor="secondary"
                textColor="secondary"
                variant="fullWidth"
            >
                {tabConfigs.map((tc, index) => (
                    <Tab label={tc.label} value={index} />
                ))}
            </Tabs>
            {tabConfigs.map((tc, index) => (
                <TabPanel className='tab-panel' value={index}>
                    {tc.component}
                </TabPanel>
            ))}
        </div>
    )
})

export default CustomTabs;