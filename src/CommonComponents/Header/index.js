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
import Guide from '../Guide';

const Header = memo(({ 
    shouldShowOverlay, 
    isSignedIn,
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

    // Action-button in top-right of header
    let actionButton = null;
    if (!shouldShowOverlay && (pathname !== ROUTES.Login)) {
        actionButton = isSignedIn
            ? (
                <IconButton className="action-button settings-icon" onClick={() => setIsSettingsModalOpen(true)}>
                    <SettingsIcon />
                </IconButton>
            )
            : (
                <Button className='action-button create-list' color="primary" variant="contained" onClick={onClickLogin}>
                    Create my list
                </Button>
            );
    }

    return (
        <>
            <div className={`header ${shouldShowOverlay ? 'overlay-mode' : 'header-mode'}`}>
                {logo}
                {actionButton}
            </div>
            {isSettingsModalOpen && !shouldShowOverlay && (pathname !== ROUTES.Login) &&
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

    return <Header 
        shouldShowOverlay={shouldShowOverlay} 
        isSignedIn={isSignedIn}
        shouldUseAboutIntro={shouldUseAboutIntro}
    />;
}