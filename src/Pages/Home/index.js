import Button from '@material-ui/core/Button';
import { useContext, memo } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../AppContext';
import './Home.scss';
import { ROUTES } from '../../Constants';

const Home = memo(({ user, signOut }) => {
    const history = useHistory();

    if (!user) {
        history.push(ROUTES.Login);
    }

    return (
        <div className='home-page'>
            Home

            <Button color="primary" onClick={() => signOut(history)}>
                Sign Out
            </Button>
        </div>
    )
});

export default function ConnectedHome() {
    const { state, actions } = useContext(AppContext);
    const { user } = state;
    const { signOut } = actions;

    return <Home user={user} signOut={signOut} />;
}