import './Header.scss';
import { useContext, memo } from 'react';
import AppContext from '../../../AppContext';
import Logo from '../../../CommonComponents/Logo';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

const Header = memo(({ isSignedIn, setIsSettingsModalOpen }) => {
    const onClickSettingsIcon = () => {
        setIsSettingsModalOpen(true);
    }

    return (
        <div className='header'>
            <Logo sizeScale={0.25} shouldAnimate={false} />
            {isSignedIn &&
                <IconButton className="settings-icon" onClick={onClickSettingsIcon}>
                    <SettingsIcon />
                </IconButton>
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