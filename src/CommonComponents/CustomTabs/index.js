import React, { useState, memo } from 'react';
import TabList from '@material-ui/lab/TabList';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import './CustomTabs.scss';

const CustomTabs = memo(({ tabConfigs }) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const onChangeTab = (event, tabIndex) => {
        if (currentTabIndex !== tabIndex) {
            setCurrentTabIndex(tabIndex);

            tabConfigs[tabIndex].onTabSelected?.();
        }
    };

    return (
        <div className='tabs-container'>
            <TabContext value={`${currentTabIndex}`}>
                <TabList
                    onChange={onChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                >
                    {tabConfigs.map((tc, index) => (
                        <Tab key={index} label={tc.label} value={`${index}`} />
                    ))}
                </TabList>
                {tabConfigs.map((tc, index) => {
                    return <TabPanel key={index} className='tab-panel' value={`${index}`}>
                        {tc.component}
                    </TabPanel>
                })}
            </TabContext>
        </div>
    )
})

export default CustomTabs;