import { useContext, memo, useEffect, useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { BASE_URL, EVENTS, HOME_TABS, MAX_NUM_MOVIES, ROUTES } from '../../Constants';
import AppContext from '../../AppContext';
import Profile from './Profile';
import { FirebaseContext, log } from '../../Firebase';
import FavoriteList from './FavoriteList';
import Charts from './Charts';
import Suggestions from './Suggestions';
import WatchLater from './WatchLater';
import CustomTabs from '../../CommonComponents/CustomTabs';
import { FavoriteListIcon, WatchLaterListIcon } from '../../CommonComponents/Icons';
import { DragDropContext } from 'react-beautiful-dnd';
import { getIsSignedIn } from '../../AppSelectors';
import SearchBar from './SearchBar';
import { profileHeight } from '../../StyleExports.module.scss';
import { EmailVerification } from './EmailVerification';
import { getIsOnline } from '../../Utilities/EnvironmentUtilities';

const Home = memo(({ 
    isSignedIn,
    isOnline,
    hasSentEmailVerification, 
    setHasSentEmailVerification, 
    changeHomeTab,
    favoriteMovies,
    watchLaterMovies,
    reorderMovieList,
    setIsWatchLaterTabHeaderMounted,
    shouldShowSuggestions
}) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const searchRef = useRef(null);
    const [isScrolledThreshold, setIsScrolledThreshold] = useState(false);
    
    // Send back to login page if not signed in
    useEffect(() => {
        if (!isSignedIn) {
            history.push(ROUTES.Login);
        }
    }, [isSignedIn, history]);

    // Pin search bar to top of mobile when scrolled past upper profile
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

    //#region Email confirmation
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
        const authUser = firebase.auth().currentUser;
        if (authUser && !authUser.emailVerified && !hasSentEmailVerification && isOnline) {
            sendConfirmationEmail();
            setHasSentEmailVerification(true);
        }
    }, [firebase, hasSentEmailVerification, setHasSentEmailVerification, sendConfirmationEmail, isOnline]);
    //#endregion

    if (!isSignedIn) {
        return null;
    }

    const authUser = firebase.auth().currentUser;
    if (authUser && authUser.email && !authUser.emailVerified) {
        return <EmailVerification 
            email={authUser.email}
            onClickSendEmail={onClickSendEmail}
            isOnline={isOnline}
        />;
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

    const onDragStart = () => {
        searchRef.current?.blur();
    }

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

    return (
        <div className={`home-page ${isScrolledThreshold ? 'threshold' : ''}`}>
            <div className='upper'>
                <Profile />
                {shouldShowSuggestions &&
                    <Suggestions />
                }
            </div>
            <div className='lower'>
                <div className='left'>
                    <div className='search-wrapper'>
                        <SearchBar ref={searchRef} />
                    </div>
                    <DragDropContext 
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                    >
                        <CustomTabs
                            tabConfigs={tabConfigs} 
                            onMount={setIsWatchLaterTabHeaderMounted}
                        />
                    </DragDropContext>
                </div>
                <div className='right'>
                    <Charts />
                </div>
            </div>
        </div>
    )
});

export default function ConnectedHome() {
    const { state, actions } = useContext(AppContext);
    const { hasSentEmailVerification, friends, favoriteMovies, watchLaterMovies } = state;
    const { setHasSentEmailVerification, changeHomeTab, reorderMovieList, setIsWatchLaterTabHeaderMounted } = actions;

    const shouldShowSuggestions = (friends.length > 0) && (favoriteMovies.length < MAX_NUM_MOVIES);
    const isSignedIn = getIsSignedIn(state);
    const isOnline = getIsOnline();

    return (
        <Home 
            isSignedIn={isSignedIn}
            isOnline={isOnline}
            favoriteMovies={favoriteMovies}
            watchLaterMovies={watchLaterMovies}
            hasSentEmailVerification={hasSentEmailVerification}
            setHasSentEmailVerification={setHasSentEmailVerification} 
            changeHomeTab={changeHomeTab}
            reorderMovieList={reorderMovieList}
            setIsWatchLaterTabHeaderMounted={setIsWatchLaterTabHeaderMounted}
            shouldShowSuggestions={shouldShowSuggestions}
        />
    );
}