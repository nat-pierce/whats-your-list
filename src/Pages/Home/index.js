import Button from '@material-ui/core/Button';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { ROUTES } from '../../Constants';
import { FirebaseContext } from '../../Firebase';
import HomeHeader from './HomeHeader';

export default function Home() {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth();

    // useEffect(() => {
    //     if (!auth.currentUser.emailVerified) {
    //         auth.currentUser.sendEmailVerification();
    //     }
    // }, [auth]);

    const onSignOut = () => {
        auth.signOut().then(() => {
            history.push(ROUTES.Login);
        });
    }

    return (
        <div className='home-page'>
            <HomeHeader />

            <Button color="primary" onClick={onSignOut}>
                Sign Out
            </Button>
        </div>
    )
}