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

    return <>
        <div className='header'>
            <div className='logo-wrapper' onClick={onClickLogo}>
                <Logo sizeScale={0.25} shouldAnimate={false} />
            </div>
            {isSignedIn
                ? (
                    <IconButton 
                        className="settings-icon" 
                        onClick={() => setIsSettingsModalOpen(true)}
                    >
                        <SettingsIcon />
                    </IconButton>
                )
                : (
                    <Button 
                        color="primary" 
                        variant="contained" 
                        onClick={onClickLogin}
                    >
                        Create my list
                    </Button>
                )
            }
        </div>
        {isSettingsModalOpen && 
            <SettingsModal onClose={() => setIsSettingsModalOpen(false)} />
        }
    </>;
});

export default function ConnectedHeader() {
    const { state } = useContext(AppContext);
    const { user } = state;

    return <Header isSignedIn={!!user} />;
}