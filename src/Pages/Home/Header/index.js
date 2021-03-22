import './Header.scss';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { FirebaseContext } from '../../../Firebase';
import { ROUTES } from '../../../Constants';

export default function Header() {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth();
    
    const onSignOut = () => {
        auth.signOut().then(() => {
            history.push(ROUTES.Login);
        });
    }

    return (
        <div className='header'>
            <div>What's Your List?</div>
            <Button color="primary" onClick={onSignOut}>
                Sign Out
            </Button>
        </div>
    );
}