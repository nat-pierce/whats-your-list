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

const Header = memo(({ isSignedIn }) => {
    const history = useHistory();
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const onClickLogo = () => {
        history.push(ROUTES.Home);
    };

    const onClickLogin = () => {
        history.push(ROUTES.Login);
    };

    // TODO handle viewList with no user (on login fail this still needs to be false)
    const shouldShowOverlay = !isSignedIn;

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
    if (!shouldShowOverlay && isSignedIn) {
        actionButton = (
            <IconButton className="action-button settings-icon" onClick={() => setIsSettingsModalOpen(true)}>
                <SettingsIcon />
            </IconButton>
        );
    } else if (!shouldShowOverlay) {
        actionButton = (
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
    const { user } = state;

    return <Header isSignedIn={!!user} />;
}