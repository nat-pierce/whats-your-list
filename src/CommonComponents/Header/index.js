import './Header.scss';
import { useContext, useState, memo, useEffect } from 'react';
import AppContext from '../../AppContext';
import Logo from '../Logo';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { LOCAL_STORAGE_ABOUT_INTRO, ROUTES } from '../../Constants';
import SettingsModal from './Settings';
import { getHasAttemptedSignIn, getIsSignedIn } from '../../AppSelectors';
import { useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RefreshIcon from '@material-ui/icons/Refresh';
import Guide from '../Guide';
import { getIsOnline } from '../../Utilities/EnvironmentUtilities';

const Header = memo(({ 
    shouldShowOverlay, 
    isSignedIn,
    isOnline,
    shouldUseAboutIntro
}) => {
    const history = useHistory();
    const { pathname } = useLocation();
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [shouldShowGuide, setShouldShowGuide] = useState(!shouldUseAboutIntro);

    useEffect(() => {
        if (!shouldShowOverlay && shouldUseAboutIntro) {
            setIsSettingsModalOpen(true);
        }
    }, [shouldShowOverlay, shouldUseAboutIntro, setIsSettingsModalOpen])

    const onClickLogo = () => {
        history.push(ROUTES.Home);
    };

    const onClickLogin = () => {
        history.push(ROUTES.Login);
    };

    const onClickRefresh = () => {
        history.go(0);
    }

    // Splash logo / Logo-button in top-left of header
    const canClickHeader = !shouldShowOverlay && (pathname !== ROUTES.Login) && (pathname !== ROUTES.Home); 
    const logo = (
        <div 
            className={`logo-wrapper ${canClickHeader ? 'can-click' : ''}`}
            onClick={canClickHeader ? onClickLogo : undefined}
        >
            {canClickHeader && isSignedIn && <ArrowBackIosIcon className='back-icon' />}
            <Logo 
                key={`logo_key_${shouldShowOverlay}`}
                sizeScale={0.25} 
                shouldAnimate={shouldShowOverlay} 
                animationSpeed={250}
            />
        </div>
    );

    //#region Action-button in top-right of header
    // 1: if we're in loading state, don't show anything
    // 2: otherwise, if we're offline (even at login), show a refresh button
    // 3: otherwise, if we're at the login page, don't show anything
    // 4: otherwise, if we're not signed in (viewing list anonymously), show a button to go login
    // 5: otherwise, we can show the settings
    let actionButton, canShowSettings;
    if (shouldShowOverlay) {
        actionButton = null;
    } else if (!isOnline) {
        actionButton = (
            <Button className="action-button refresh-button" color="primary" variant="contained" onClick={onClickRefresh}>
                <RefreshIcon /> Refresh
            </Button>
        );
    } else if (pathname === ROUTES.Login) {
        actionButton = null;
    } else if (!isSignedIn) {
        actionButton = (
            <Button className='action-button create-list' onClick={onClickLogin}>
                Create my list
            </Button>
        );
    } else {
        canShowSettings = true;
        actionButton = (
            <IconButton className="action-button settings-icon" onClick={() => setIsSettingsModalOpen(true)}>
                <SettingsIcon />
            </IconButton>
        );
    }
    //#endregion

    return (
        <>
            <div className={`header ${shouldShowOverlay ? 'overlay-mode' : 'header-mode'}`}>
                {logo}
                {actionButton}
            </div>
            {isSettingsModalOpen && canShowSettings &&
                <SettingsModal 
                    shouldUseAboutIntro={shouldUseAboutIntro}
                    onClose={() => {
                        if (shouldUseAboutIntro) {
                            localStorage.setItem(LOCAL_STORAGE_ABOUT_INTRO, 'true');
                            setShouldShowGuide(true);
                        }

                        setIsSettingsModalOpen(false)
                    }}
                />
            }
            {shouldShowGuide && <Guide />}
        </>
    );
});

export default function ConnectedHeader() {
    const { state } = useContext(AppContext);

    const shouldShowOverlay = !getHasAttemptedSignIn(state);
    const isSignedIn = getIsSignedIn(state);
    const shouldUseAboutIntro = !localStorage.getItem(LOCAL_STORAGE_ABOUT_INTRO);
    const isOnline = getIsOnline();

    return <Header 
        shouldShowOverlay={shouldShowOverlay} 
        isSignedIn={isSignedIn}
        shouldUseAboutIntro={shouldUseAboutIntro}
        isOnline={isOnline}
    />;
}