import { useContext, memo, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { BASE_URL, EVENTS, MAX_NUM_MOVIES, ROUTES } from '../../Constants';
import AppContext from '../../AppContext';
import Header from '../../CommonComponents/Header';
import Profile from './Profile';
import { FirebaseContext, log } from '../../Firebase';
import FavoriteList from './FavoriteList';
import Charts from './Charts';
import Settings from './Settings';
import Button from '@material-ui/core/Button';
import OverlayLogoSpinner from '../../CommonComponents/OverlayLogoSpinner';
import Suggestions from './Suggestions';
import { smallScreenMax } from '../../StyleExports.module.scss';

const Home = memo(({ numFavoriteMovies, user, hasSentEmailVerification, setHasSentEmailVerification, numFriends }) => {
    const history = useHistory();
    const [isMounted, setIsMounted] = useState(false);
    const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false);
    const firebase = useContext(FirebaseContext);
    const authUser = firebase.auth().currentUser;

    const sendConfirmationEmail = useCallback(() => {
        authUser.sendEmailVerification({
            url: BASE_URL
        })
        .catch((err) => console.error(err));
    }, [authUser]);

    const onClickSendEmail = () => {
        log(EVENTS.ResendEmail);
        sendConfirmationEmail();
    }

    const resizeListener = () => {
        if (window.innerWidth < parseInt(smallScreenMax)) {
            setShouldShowSuggestions(false);
        } else {
            setShouldShowSuggestions(true);
        }
    }

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

    useEffect(() => {
        resizeListener();
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    if (!isMounted || !user) {
        return <OverlayLogoSpinner />;
    }

    if (authUser && !authUser.emailVerified) {
        return (
            <div className='email-verification-page'>
                <Header />
                <div className='message'>Email verification sent!</div>
                <Button color="primary" variant="contained" onClick={onClickSendEmail}>
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
                    {shouldShowSuggestions && numFriends > 0 && (numFavoriteMovies < MAX_NUM_MOVIES) &&
                        <Suggestions />
                    }
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
    const { user, hasSentEmailVerification, friends, favoriteMovies } = state;
    const { setHasSentEmailVerification } = actions;

    return <Home 
        user={user} 
        numFriends={friends.length}
        numFavoriteMovies={favoriteMovies.length}
        hasSentEmailVerification={hasSentEmailVerification}
        setHasSentEmailVerification={setHasSentEmailVerification} />
}