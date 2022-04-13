import { useContext, memo, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { BASE_URL, EVENTS, HOME_TABS, MAX_NUM_MOVIES, ROUTES } from '../../Constants';
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
import WatchLater from './WatchLater';
import CustomTabs from '../../CommonComponents/CustomTabs';
import { FavoriteListIcon, WatchLaterListIcon } from '../../CommonComponents/Icons';

const Home = memo(({ 
    numFavoriteMovies, 
    user, 
    hasSentEmailVerification, 
    setHasSentEmailVerification, 
    numFriends,
    changeHomeTab
}) => {
    const history = useHistory();
    const [isMounted, setIsMounted] = useState(false);
    const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false);
    const firebase = useContext(FirebaseContext);

    const sendConfirmationEmail = useCallback(() => {
        const authUser = firebase.auth().currentUser;
        authUser.sendEmailVerification({
            url: BASE_URL
        })
        .catch((err) => console.error(err));
    }, [firebase]);

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
        const authUser = firebase.auth().currentUser;
        if (authUser && !authUser.emailVerified && !hasSentEmailVerification) {
            sendConfirmationEmail();
            setHasSentEmailVerification(true);
        }
    }, [firebase, hasSentEmailVerification, setHasSentEmailVerification, sendConfirmationEmail]);

    useEffect(() => {
        resizeListener();
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    if (!isMounted || !user) {
        return <OverlayLogoSpinner />;
    }

    const authUser = firebase.auth().currentUser;
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

    const tabConfigs = [
        {
            label: <div className='home-tab-header'>
                {FavoriteListIcon}
                <span className='tab-name'>Favorites</span>
            </div>,
            component: <FavoriteList />,
            onTabSelected: () => changeHomeTab(HOME_TABS.Favorites)
        },
        {
            label: <div className='home-tab-header'>
                {WatchLaterListIcon} 
                <span className='tab-name'>Watch Later</span>
            </div>,
            component: <WatchLater />,
            onTabSelected: () => changeHomeTab(HOME_TABS.WatchLater)
        }
    ];

    return (
        <div className='home-page'>
            <Header />
            <div className='main-content'>
                <div className='upper'>
                    <Profile />
                    {shouldShowSuggestions && (numFriends > 0) && (numFavoriteMovies < MAX_NUM_MOVIES) &&
                        <Suggestions />
                    }
                </div>
                <div className='lower'>
                    <CustomTabs tabConfigs={tabConfigs} />
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
    const { setHasSentEmailVerification, changeHomeTab } = actions;

    return <Home 
        user={user} 
        numFriends={friends.length}
        numFavoriteMovies={favoriteMovies.length}
        hasSentEmailVerification={hasSentEmailVerification}
        setHasSentEmailVerification={setHasSentEmailVerification} 
        changeHomeTab={changeHomeTab}
    />
}