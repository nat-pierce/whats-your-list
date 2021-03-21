import Button from '@material-ui/core/Button';
import { useContext, memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { ROUTES } from '../../Constants';
import { FirebaseContext } from '../../Firebase';
import AppContext from '../../AppContext';

const Home = memo(({ user, setUser }) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth();

    const onSignOut = () => {
        auth.signOut().then(() => {
            history.push(ROUTES.Login);
        });
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userAuth => {
            if (userAuth) {
                setUser(userAuth);
            }
        })
    }, [firebase, setUser]);

    console.log('u', user);

    if (!user) {
        return null; // TODO spinner
    }

    if (!user.emailVerified) {
        auth.currentUser.sendEmailVerification({
            url: ROUTES.Login
        })
        .catch((err) => console.error(err));

        return (
            <div className='email-verification-message'>
                Email verification sent!
            </div>
        );
    }

    return (
        <div className='home-page'>

            <Button color="primary" onClick={onSignOut}>
                Sign Out
            </Button>
        </div>
    )
});

export default function ConnectedHome() {
    const { state, actions } = useContext(AppContext);
    const { user } = state;
    const { setUser } = actions;

    return <Home user={user} setUser={setUser} />
}