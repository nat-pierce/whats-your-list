import './Header.scss';
import Button from '@material-ui/core/Button';
import { useContext } from 'react';
import { FirebaseContext } from '../../../Firebase';

export default function Header() {
    const firebase = useContext(FirebaseContext);
    
    const onSignOut = () => {
        firebase.auth().signOut();
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