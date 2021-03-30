import { useEffect, useContext, memo, useState } from 'react';
import './Login.scss';
import { ROUTES } from '../../Constants';
import { FirebaseContext } from '../../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; // TODO switch to regular and style it
import { useHistory } from 'react-router-dom';
import AppContext from '../../AppContext';
import Logo from '../../CommonComponents/Logo';
import OverlayLogoSpinner from '../../CommonComponents/OverlayLogoSpinner';

const Login = memo(({ user, setUser }) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (user) {
            history.push(ROUTES.Home);
        }
    }, [user, history]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(authUser => {
            if (authUser) {
                setUser(authUser.uid)
            } else {
                setIsMounted(true);
            }
        })
    }, [setIsMounted, setUser, firebase])

    const uiConfig = {
        signInOptions: [{
            requireDisplayName: true,
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        }],
        callbacks: {
            signInSuccessWithAuthResult: async (authResult) => {
                if (authResult.additionalUserInfo.isNewUser) {
                    const userInfo = {
                        uid: authResult.user.uid,
                        email: authResult.user.email
                    };
    
                    await firebase.firestore().collection('users')
                        .doc(authResult.user.uid)
                        .set(userInfo);

                    await firebase.firestore().collection('publicUserInfo')
                        .doc(authResult.user.uid)
                        .set({ 
                            name: authResult.user.displayName,
                            profilePicUrl: null 
                        });

                    setUser(authResult.user.uid);
                }
            }
        }
    };

    if (!isMounted) {
        return <OverlayLogoSpinner />;
    }

    return (
        <div className="login-page">
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
    const { user } = state;
    const { setUser } = actions;

    return <Login user={user} setUser={setUser} />
}