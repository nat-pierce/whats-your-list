import { useEffect, useContext, memo } from 'react';
import './Login.scss';
import { ROUTES } from '../../Constants';
import { FirebaseContext } from '../../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router-dom';
import AppContext from '../../AppContext';

const Login = memo(({ setUser }) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    // Configure FirebaseUI.
    const uiConfig = {
        signInSuccessUrl: ROUTES.Login,
        signInOptions: [{
            requireDisplayName: true,
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        }],
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user, history);
            }
        })
    }, [firebase, history, setUser]);

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
    const { actions } = useContext(AppContext);
    const { setUser } = actions;

    return <Login setUser={setUser} />
}