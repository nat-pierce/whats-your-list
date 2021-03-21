import Button from '@material-ui/core/Button';
import { useContext, memo } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../AppContext';
import './Home.scss';

const Home = memo(({ signOut }) => {
    const history = useHistory();

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
    const { actions } = useContext(AppContext);
    const { signOut } = actions;

    return <Home signOut={signOut} />;
}