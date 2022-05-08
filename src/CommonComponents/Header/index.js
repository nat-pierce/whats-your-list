import './Header.scss';
import { useContext, useState, memo } from 'react';
import AppContext from '../../AppContext';
import Logo from '../Logo';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { ROUTES } from '../../Constants';
import SettingsModal from './Settings';
import { getHasAttemptedSignIn, getIsSignedIn } from '../../AppSelectors';
import { useLocation } from 'react-router-dom';

const Header = memo(({ 
    shouldShowOverlay, 
    isSignedIn 
}) => {
    const history = useHistory();
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const { pathname } = useLocation();
    const isOnLoginPage = pathname === ROUTES.Login;

    const onClickLogo = () => {
        history.push(ROUTES.Home);
    };

    const onClickLogin = () => {
        history.push(ROUTES.Login);
    };

    // Splash logo / Logo-button in top-left of header
    const logo = (
        <div className='logo-wrapper' onClick={shouldShowOverlay ? undefined : onClickLogo}>
            <Logo 
                sizeScale={0.25} 
                shouldAnimate={false} 
            />
        </div>
    );

    // Action-button in top-right of header
    let actionButton = null;
    if (!shouldShowOverlay && !isOnLoginPage) {
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
            {isSettingsModalOpen && !shouldShowOverlay &&
                <SettingsModal onClose={() => setIsSettingsModalOpen(false)} />
            }
        </>
    );
});

export default function ConnectedHeader() {
    const { state } = useContext(AppContext);

    const shouldShowOverlay = !getHasAttemptedSignIn(state);
    const isSignedIn = getIsSignedIn(state);

    return <Header shouldShowOverlay={shouldShowOverlay} isSignedIn={isSignedIn} />;
}