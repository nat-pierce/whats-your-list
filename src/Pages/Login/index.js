import { useEffect, useContext, memo } from 'react';
import './Login.scss';
import { ROUTES } from '../../Constants';
import { FirebaseContext } from '../../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; // TODO switch to regular and style it
import { useHistory } from 'react-router-dom';
import AppContext from '../../AppContext';

const Login = memo(({ user }) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        if (user) {
            history.push(ROUTES.Home);
        }
    }, [user, history]);

    const uiConfig = {
        signInSuccessUrl: ROUTES.Home,
        signInOptions: [{
            requireDisplayName: true,
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        }],
    };

    return (
        <div className="login-page">
            <div className='landing-header'>
                <h1>What's Your List?</h1>
                <h2>Share and compare your favorite movies with friends</h2>
            </div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
});

export default function ConnectedLogin() {
    const { state } = useContext(AppContext);
    const { user } = state;

    return <Login user={user} />
}