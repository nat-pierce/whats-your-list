import React, { memo, useContext } from 'react';
import Joyride from 'react-joyride';
import './Guide.scss';
import Button from '@material-ui/core/Button';
import AppContext from '../../AppContext';
import { getShouldGuideStepSearch, getShouldGuideStepWatchLater, getShouldGuideStepSecondWatchLater } from '../../AppSelectors';

const LocalStorageKeySearchStep = "LOCAL_STORAGE_SEARCH_STEP";
const LocalStorageKeyWatchTabStep = "LOCAL_STORAGE_WATCH_TAB_STEP";
const LocalStorageKeyWatchSearchStep = "LOCAL_STORAGE_WATCH_SEARCH_STEP";

const Guide = memo(({ 
    shouldAddSearchStep,
    shouldAddSaveLaterStep,
    shouldAddSaveLaterSecondStep
}) => {
    const steps = [];

    if (shouldAddSearchStep) {
        steps.push({
            target: '.search',
            content: 'Search for your favorite movie to get started',
            disableBeacon: true,
            localStorageKey: LocalStorageKeySearchStep
        });
    }

    if (shouldAddSaveLaterStep) {
        steps.push({
            target: '.save-later-tab-header',
            content: 'You can save movies to watch later, then view that list here',
            disableBeacon: true,
            localStorageKey: LocalStorageKeyWatchTabStep
        });
    }

    if (shouldAddSaveLaterSecondStep) {
        steps.push({
            target: '.search',
            content: 'On this tab, movies will get added to your Watch Later list',
            disableBeacon: true,
            localStorageKey: LocalStorageKeyWatchSearchStep
        });
    }

    const Tooltip = ({
        continuous,
        index,
        step,
        backProps,
        closeProps,
        primaryProps,
        tooltipProps
    }) => (
        <div {...tooltipProps} className='guide-tooltip'>
            {step.title && <h1>{step.title}</h1>}
            <div className='content'>{step.content}</div>
            <div className='footer'>
                {index > 0 && (
                    <Button {...backProps} className='action-button' variant="contained" color="primary">
                        Back
                    </Button>
                )}
                {continuous && (
                    <Button {...primaryProps} className='action-button' variant="contained" color="primary">
                        Next
                    </Button>
                )}
                {!continuous && (
                    <Button {...closeProps} className='action-button' variant="contained" color="primary">
                        Got it
                    </Button>
                )}
            </div>
        </div>
    );

    const callback = ({ action, step }) => {
        if ((action === 'close') && step) {
            localStorage.setItem(step.localStorageKey, 'true');
        }
    }

    const filteredSteps = steps.filter(s => !localStorage.getItem(s.localStorageKey));
    const key = filteredSteps.reduce((accumulator, step) => accumulator += step.localStorageKey, '');
    
    return (
        <Joyride
            key={key}
            steps={filteredSteps}
            tooltipComponent={Tooltip}
            callback={callback}
            disableScrollParentFix={true}
            disableScrolling={true}
        />  
    );
});

export default function ConnectedGuide() {
    const { state } = useContext(AppContext);

    const shouldAddSearchStep = getShouldGuideStepSearch(state);
    const shouldAddSaveLaterStep = getShouldGuideStepWatchLater(state);
    const shouldAddSaveLaterSecondStep = getShouldGuideStepSecondWatchLater(state);

    return (
        <Guide
            shouldAddSearchStep={shouldAddSearchStep}
            shouldAddSaveLaterStep={shouldAddSaveLaterStep}
            shouldAddSaveLaterSecondStep={shouldAddSaveLaterSecondStep}
        />
    );
}