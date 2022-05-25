import React, { useState, useEffect, memo } from 'react';
import TabList from '@material-ui/lab/TabList';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import './CustomTabs.scss';

const CustomTabs = memo(({ className = '', tabConfigs, onMount }) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const onChangeTab = (event, tabIndex) => {
        if (currentTabIndex !== tabIndex) {
            setCurrentTabIndex(tabIndex);

            tabConfigs[tabIndex].onTabSelected?.();
        }
    };

    useEffect(() => {
        if (!onMount) { return }

        onMount(true);

        return () => {
            onMount(false);
        }
    }, [onMount])

    return (
        <div className='tabs-container'>
            <TabContext value={`${currentTabIndex}`}>
                <TabList
                    className={className}
                    onChange={onChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                >
                    {tabConfigs.map((tc, index) => (
                        <Tab key={index} label={tc.label} value={`${index}`} />
                    ))}
                </TabList>
                {tabConfigs.map((tc, index) => (
                    <TabPanel key={index} className='tab-panel' value={`${index}`}>
                        {tc.component}
                    </TabPanel>
                ))}
            </TabContext>
        </div>
    )
})

export default CustomTabs;