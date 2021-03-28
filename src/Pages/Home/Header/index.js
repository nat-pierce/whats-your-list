import './Header.scss';
import { useContext, memo } from 'react';
import AppContext from '../../../AppContext';
import Logo from '../../../CommonComponents/Logo';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';

const Header = memo(({ isSignedIn, setIsSettingsModalOpen }) => {
    const onClickSettingsIcon = () => {
        setIsSettingsModalOpen(true);
    }

    const onClickLogin = () => {
        // TODO redirect to login page
    }

    return (
        <div className='header'>
            <Logo sizeScale={0.25} shouldAnimate={false} />
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