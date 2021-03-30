import { useContext, memo, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { ROUTES } from '../../Constants';
import AppContext from '../../AppContext';
import Header from '../../CommonComponents/Header';
import Profile from './Profile';
import { FirebaseContext } from '../../Firebase';
import FavoriteList from './FavoriteList';
import SearchBar from './SearchBar';
import Charts from './Charts';
import Settings from './Settings';
import Button from '@material-ui/core/Button';
import OverlayLogoSpinner from '../../CommonComponents/OverlayLogoSpinner';

const Home = memo(({ user, hasSentEmailVerification, setHasSentEmailVerification }) => {
    const history = useHistory();
    const [isMounted, setIsMounted] = useState(false);
    const firebase = useContext(FirebaseContext);
    const authUser = firebase.auth().currentUser;

    const sendConfirmationEmail = useCallback(() => {
        authUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        })
        .catch((err) => console.error(err));
    }, [authUser]);

    useEffect(() => {
        if (!user && !isMounted) {
            history.push(ROUTES.Login);
        } else {
            setIsMounted(true);
        }
    }, [user, history, setIsMounted, isMounted]);

    useEffect(() => {
        if (authUser && !authUser.emailVerified && !hasSentEmailVerification) {
            console.log('sent email');
            sendConfirmationEmail();
            setHasSentEmailVerification(true);
        }
    }, [authUser, hasSentEmailVerification, setHasSentEmailVerification, sendConfirmationEmail]);

    if (!isMounted || !user) {
        return <OverlayLogoSpinner />;
    }

    if (authUser && !authUser.emailVerified) {
        return (
            <div className='email-verification-page'>
                <Header />
                <div className='message'>Email verification sent!</div>
                <Button color="primary" variant="contained" onClick={sendConfirmationEmail}>
                    Send again
                </Button>
                <Settings />
            </div>
        );
    }

    return (
        <div className='home-page'>
            <Header />
            <div className='main-content'>
                <div className='upper'>
                    <Profile />
                    <SearchBar />
                </div>
                <div className='lower'>
                    <FavoriteList />
                    <Charts />
                </div>
            </div>
            <Settings />
        </div>
    )
});

export default function ConnectedHome() {
    const { state, actions } = useContext(AppContext);
    const { user, hasSentEmailVerification } = state;
    const { setHasSentEmailVerification } = actions;

    return <Home 
        user={user} 
        hasSentEmailVerification={hasSentEmailVerification}
        setHasSentEmailVerification={setHasSentEmailVerification} />
}