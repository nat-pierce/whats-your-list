import { useContext, memo, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { BASE_URL, EVENTS, HOME_TABS, MAX_NUM_MOVIES, ROUTES, LOCAL_STORAGE_PWA_POPUP } from '../../Constants';
import AppContext from '../../AppContext';
import Profile from './Profile';
import { FirebaseContext, log } from '../../Firebase';
import FavoriteList from './FavoriteList';
import Charts from './Charts';
import Button from '@material-ui/core/Button';
import Suggestions from './Suggestions';
import WatchLater from './WatchLater';
import CustomTabs from '../../CommonComponents/CustomTabs';
import { FavoriteListIcon, WatchLaterListIcon } from '../../CommonComponents/Icons';
import { DragDropContext } from 'react-beautiful-dnd';
import AddToHomeScreenPopup from '../../CommonComponents/AddToHomeScreenPopup';
import { getIsSignedIn, getCanShowPwaPopup } from '../../AppSelectors';
import SearchBar from './SearchBar';
import { profileHeight } from '../../StyleExports.module.scss';

const Home = memo(({ 
    user, 
    isSignedIn,
    hasSentEmailVerification, 
    setHasSentEmailVerification, 
    changeHomeTab,
    favoriteMovies,
    watchLaterMovies,
    reorderMovieList,
    setIsWatchLaterTabHeaderMounted,
    shouldShowSuggestions,
    canShowPwaPopup
}) => {
    const history = useHistory();
    const [shouldShowPopupInternal, setShouldShowPopupInternal] = useState(false);
    const firebase = useContext(FirebaseContext);
    const [isScrolledThreshold, setIsScrolledThreshold] = useState('');

    const sendConfirmationEmail = useCallback(() => {
        const authUser = firebase.auth().currentUser;

        authUser.sendEmailVerification({ url: BASE_URL })
            .catch((err) => {
                console.error(err)
            });
    }, [firebase]);

    const onClickSendEmail = () => {
        log(EVENTS.ResendEmail);
        sendConfirmationEmail();
    }

    useEffect(() => {
        const onScroll = () => {
            const threshold = parseInt(profileHeight);
    
            if (!isScrolledThreshold && (window.scrollY > threshold)) {
                setIsScrolledThreshold(true);
            } else if (isScrolledThreshold && (window.scrollY < threshold)) {
                setIsScrolledThreshold(false);
            }
        }

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [isScrolledThreshold, setIsScrolledThreshold]);

    useEffect(() => {
        if (!isSignedIn) {
            history.push(ROUTES.Login);
        }
    }, [isSignedIn, history]);

    useEffect(() => {
        if (canShowPwaPopup) {
            setTimeout(() => {
                setShouldShowPopupInternal(true);
            }, 2000)
        }
    }, [canShowPwaPopup, setShouldShowPopupInternal]);

    useEffect(() => {
        const authUser = firebase.auth().currentUser;
        if (authUser && !authUser.emailVerified && !hasSentEmailVerification) {
            sendConfirmationEmail();
            setHasSentEmailVerification(true);
        }
    }, [firebase, hasSentEmailVerification, setHasSentEmailVerification, sendConfirmationEmail]);

    if (!isSignedIn) {
        return null;
    }

    const authUser = firebase.auth().currentUser;
    if (authUser && !authUser.emailVerified) {
        return (
            <div className='email-verification-page'>
                <div className='message'>Email verification sent!</div>
                <Button color="primary" variant="contained" onClick={onClickSendEmail}>
                    Send again
                </Button>
            </div>
        );
    }

    const tabConfigs = [
        {
            label: (
                <div className='home-tab-header favorites-tab-header'>
                    {FavoriteListIcon}
                    <span className='tab-name'>
                        Favorites
                    </span>
                </div>
            ),
            component: <FavoriteList isScrolledThreshold={isScrolledThreshold} />,
            onTabSelected: () => changeHomeTab(HOME_TABS.Favorites)
        },
        {
            label: (
                <div className='home-tab-header save-later-tab-header'>
                    {WatchLaterListIcon} 
                    <span className='tab-name'>
                        Watch Later
                    </span>
                </div>
            ),
            component: <WatchLater isScrolledThreshold={isScrolledThreshold} />,
            onTabSelected: () => changeHomeTab(HOME_TABS.WatchLater)
        }
    ];

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const tabType = result.destination.droppableId;
        const moviesList = tabType === HOME_TABS.Favorites
            ? favoriteMovies
            : watchLaterMovies;
    
        const items = [...moviesList];
        const [reorderedItem] = items.splice(result.source.index, 1);
    
        items.splice(result.destination.index, 0, reorderedItem);
        const itemsWithUpdatedOrderIds = items.map((item, i) => ({ ...item, OrderId: i }));
    
        reorderMovieList(itemsWithUpdatedOrderIds, tabType);
    }

    const onClosePopup = () => {
        localStorage.setItem(LOCAL_STORAGE_PWA_POPUP, 'true');
        setShouldShowPopupInternal(false);
    }

    return (
        <div className='home-page'>
            <div className='upper'>
                <Profile />
                {shouldShowSuggestions &&
                    <Suggestions />
                }
            </div>
            <div className='lower'>
                <div className='left'>
                    <div className={`search-wrapper ${isScrolledThreshold ? 'threshold' : ''}`}>
                        <SearchBar />
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <CustomTabs 
                            className={isScrolledThreshold ? 'threshold' : undefined}
                            tabConfigs={tabConfigs} 
                            onMount={setIsWatchLaterTabHeaderMounted}
                        />
                    </DragDropContext>
                </div>
                <div className='right'>
                    <Charts />
                </div>
            </div>
            {shouldShowPopupInternal && <AddToHomeScreenPopup onClose={onClosePopup} />}
        </div>
    )
});

export default function ConnectedHome() {
    const { state, actions } = useContext(AppContext);
    const { user, hasSentEmailVerification, friends, favoriteMovies, watchLaterMovies } = state;
    const { setHasSentEmailVerification, changeHomeTab, reorderMovieList, setIsWatchLaterTabHeaderMounted } = actions;

    const shouldShowSuggestions = (friends.length > 0) && (favoriteMovies.length < MAX_NUM_MOVIES);
    const isSignedIn = getIsSignedIn(state);
    const canShowPwaPopup = getCanShowPwaPopup(state);

    return (
        <Home 
            user={user}
            isSignedIn={isSignedIn}
            favoriteMovies={favoriteMovies}
            watchLaterMovies={watchLaterMovies}
            hasSentEmailVerification={hasSentEmailVerification}
            setHasSentEmailVerification={setHasSentEmailVerification} 
            changeHomeTab={changeHomeTab}
            reorderMovieList={reorderMovieList}
            setIsWatchLaterTabHeaderMounted={setIsWatchLaterTabHeaderMounted}
            shouldShowSuggestions={shouldShowSuggestions}
            canShowPwaPopup={canShowPwaPopup}
        />
    );
}