import './Header.scss';
import { useContext, memo } from 'react';
import AppContext from '../../AppContext';
import Logo from '../Logo';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { ROUTES } from '../../Constants';

const Header = memo(({ isSignedIn, setIsSettingsModalOpen }) => {
    const history = useHistory();

    const onClickLogo = () => {
        history.push(ROUTES.Home);
    };

    const onClickSettingsIcon = () => {
        setIsSettingsModalOpen(true);
    };

    const onClickLogin = () => {
        history.push(ROUTES.Login);
    };

    return (
        <div className='header'>
            <div className='logo-wrapper' onClick={onClickLogo}>
                <Logo sizeScale={0.25} shouldAnimate={false} />
            </div>
            {isSignedIn
                ? (
                    <IconButton className="settings-icon" onClick={onClickSettingsIcon}>
                        <SettingsIcon />
                    </IconButton>
                )
                : (
                    <Button color="primary" variant="contained" onClick={onClickLogin}>
                        Create my list
                    </Button>
                )
            }
        </div>
    );
});

export default function ConnectedHeader() {
    const { state, actions } = useContext(AppContext);
    const { user } = state;
    const { setIsSettingsModalOpen } = actions;

    return <Header isSignedIn={!!user} setIsSettingsModalOpen={setIsSettingsModalOpen} />;
}