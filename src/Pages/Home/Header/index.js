import './Header.scss';
import { useContext, memo } from 'react';
import AppContext from '../../../AppContext';
import Logo from '../../../CommonComponents/Logo';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

const Header = memo(({ setIsSettingsModalOpen }) => {
    const onClickSettingsIcon = () => {
        setIsSettingsModalOpen(true);
    }

    return (
        <div className='header'>
            <Logo sizeScale={0.25} shouldAnimate={false} />
            <IconButton className="settings-icon" onClick={onClickSettingsIcon}>
                <SettingsIcon />
            </IconButton>
        </div>
    );
});

export default function ConnectedHeader() {
    const { actions } = useContext(AppContext);
    const { setIsSettingsModalOpen } = actions;

    return <Header setIsSettingsModalOpen={setIsSettingsModalOpen} />;
}