import './Header.scss';
import Button from '@material-ui/core/Button';
import { useContext, memo } from 'react';
import AppContext from '../../../AppContext';
import { useHistory } from 'react-router-dom';
import Logo from '../../../CommonComponents/Logo';

const Header = memo(({ signOut }) => {
    const history = useHistory();

    const onSignOut = () => {
        signOut(history);
    };

    // TODO make Theme.js for Material
    return (
        <div className='header'>
            <Logo />
            <Button color="primary" onClick={onSignOut}>
                Sign Out
            </Button>
        </div>
    );
});

export default function ConnectedHeader() {
    const { actions } = useContext(AppContext);
    const { signOut } = actions;

    return <Header signOut={signOut} />;
}