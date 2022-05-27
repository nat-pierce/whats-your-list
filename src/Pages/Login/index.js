import { useEffect, useContext, memo, useState } from 'react';
import './Login.scss';
import { ROUTES } from '../../Constants';
import { FirebaseContext } from '../../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router-dom';
import AppContext from '../../AppContext';
import Logo from '../../CommonComponents/Logo';
import { getHasAttemptedSignIn, getIsSignedIn } from '../../AppSelectors';

const Login = memo(({ 
    hasAttemptedSignIn,
    isSignedIn, 
    setUser
}) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const [shouldHideAuth, setShouldHideAuth] = useState(false);
    
    const uiConfig = {
        signInSuccessUrl: "/", // This isn't used, we redirect in the useEffect below
        signInOptions: [{
            requireDisplayName: true,
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        }],
        callbacks: {
            signInSuccessWithAuthResult: () => {
                setShouldHideAuth(true);

                return false;
            }
        }
    };

    useEffect(() => {
        if (isSignedIn) {
            history.push(ROUTES.Home);
        }
    }, [isSignedIn, history]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(authUser => {
            setUser(authUser);
        })
    }, [setUser, firebase])

    if (!hasAttemptedSignIn) {
        return null;
    }

    return (
        <div className={`login-page ${shouldHideAuth ? 'hide' : ''}`}>
            <div className='landing-header'>
                <Logo shouldAnimate={true} />
                <h2>Share and compare your favorite movies with friends</h2>
            </div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
});

export default function ConnectedLogin() {
    const { state, actions } = useContext(AppContext);
    const { setUser } = actions;

    const hasAttemptedSignIn = getHasAttemptedSignIn(state);
    const isSignedIn = getIsSignedIn(state);

    return <Login 
        hasAttemptedSignIn={hasAttemptedSignIn}
        isSignedIn={isSignedIn} 
        setUser={setUser}
    />;
}