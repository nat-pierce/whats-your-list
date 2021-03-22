import Button from '@material-ui/core/Button';
import { useContext, memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { ROUTES } from '../../Constants';
import { FirebaseContext } from '../../Firebase';
import AppContext from '../../AppContext';

const Home = memo(({ user, isAppMounted }) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth();

    const onSignOut = () => {
        auth.signOut().then(() => {
            history.push(ROUTES.Login);
        });
    }

    useEffect(() => {
        if (isAppMounted && !user) {
            history.push(ROUTES.Login);
        }
    }, [user, isAppMounted, history]);

    if (!user) {
        return <div>Loading</div>; // Spinner
    }

    // TODO uncomment tomorrow
    // if (!user.emailVerified) {
    //     auth.currentUser.sendEmailVerification({
    //         url: ROUTES.Login
    //     })
    //     .catch((err) => console.error(err));

    //     return (
    //         <div className='email-verification-message'>
    //             Email verification sent!
    //         </div>
    //     );
    // }

    // put header, profile pic, and display name on this page with list
    return (
        <div className='home-page'>
            
            <Button color="primary" onClick={onSignOut}>
                Sign Out
            </Button>
        </div>
    )
});

export default function ConnectedHome() {
    const { state } = useContext(AppContext);
    const { user, isAppMounted } = state;

    return <Home user={user} isAppMounted={isAppMounted} />
}