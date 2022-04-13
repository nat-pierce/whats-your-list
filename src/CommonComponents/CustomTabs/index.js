import React, { useState, memo } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './CustomTabs.scss';

const CustomTabs = memo(({ tabConfigs }) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const onChangeTab = (event, tabIndex) => {
        if (currentTabIndex !== tabIndex) {
            setCurrentTabIndex(tabIndex);

            tabConfigs[tabIndex].onTabSelected?.();
        }
    };

    const TabPanel = ({ value, children }) => {
        if (value !== currentTabIndex) {
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
                value={currentTabIndex}
                onChange={onChangeTab}
                indicatorColor="secondary"
                textColor="secondary"
                variant="fullWidth"
            >
                {tabConfigs.map((tc, index) => (
                    <Tab key={index} label={tc.label} value={index} />
                ))}
            </Tabs>
            {tabConfigs.map((tc, index) => (
                <TabPanel key={index} className='tab-panel' value={index}>
                    {tc.component}
                </TabPanel>
            ))}
        </div>
    )
})

export default CustomTabs;