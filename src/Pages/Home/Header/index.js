import './Header.scss';
import Button from '@material-ui/core/Button';
import { useContext, memo } from 'react';
import AppContext from '../../../AppContext';
import { useHistory } from 'react-router-dom';

const Header = memo(({ signOut }) => {
    const history = useHistory();

    const onSignOut = () => {
        signOut(history);
    };

    return (
        <div className='header'>
            <div>What's Your List?</div>
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