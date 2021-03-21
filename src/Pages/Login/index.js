import { useEffect } from 'react';
import './Login.scss';
import { ROUTES } from '../../Constants';
import { useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router-dom';

export default function Login() {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    // Configure FirebaseUI.
    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: ROUTES.Home,
        signInOptions: [{
            requireDisplayName: true,
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        }],
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                history.push(ROUTES.Home)
            }
        })
    }, [firebase, history]);

    return (
        <div className="login-page">
            <div className='landing-header'>
                <h1>What's Your List?</h1>
                <h2>Share and compare your favorite movies with friends</h2>
            </div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
};