import './Header.scss';
import { useContext, memo } from 'react';
import AppContext from '../../../AppContext';
import Logo from '../../../CommonComponents/Logo';
import { useHistory } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import { ROUTES } from '../../../Constants';

const Header = memo(() => {
    const history = useHistory();

    const onClickSettingsIcon = () => {
        history.push(ROUTES.Settings);
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
    const { signOut } = actions;

    return <Header signOut={signOut} />;
}