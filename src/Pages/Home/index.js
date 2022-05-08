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
import { getIsIos, getIsStandalone } from '../../Utilities/EnvironmentUtilities';

const Home = memo(({ 
    user, 
    hasSentEmailVerification, 
    setHasSentEmailVerification, 
    changeHomeTab,
    favoriteMovies,
    watchLaterMovies,
    reorderMovieList,
    setIsWatchLaterTabHeaderMounted,
    shouldShowSuggestions,
    shouldShowPopup
}) => {
    const history = useHistory();
    const [shouldShowPopupInternal, setShouldShowPopupInternal] = useState(shouldShowPopup);
    const [isMounted, setIsMounted] = useState(false);
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

    if (!isMounted || !user) {
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
            component: <FavoriteList />,
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
            component: <WatchLater />,
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
                <DragDropContext onDragEnd={onDragEnd}>
                    <CustomTabs 
                        tabConfigs={tabConfigs} 
                        onMount={setIsWatchLaterTabHeaderMounted}
                    />
                </DragDropContext>
                <Charts />
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

    const isIos = getIsIos();
    const isStandalone = getIsStandalone();
    const hasSeenPopup = localStorage.getItem(LOCAL_STORAGE_PWA_POPUP);
    const shouldShowPopup = isIos && !isStandalone && !hasSeenPopup;

    return (
        <Home 
            user={user}
            favoriteMovies={favoriteMovies}
            watchLaterMovies={watchLaterMovies}
            hasSentEmailVerification={hasSentEmailVerification}
            setHasSentEmailVerification={setHasSentEmailVerification} 
            changeHomeTab={changeHomeTab}
            reorderMovieList={reorderMovieList}
            setIsWatchLaterTabHeaderMounted={setIsWatchLaterTabHeaderMounted}
            shouldShowSuggestions={shouldShowSuggestions}
            shouldShowPopup={shouldShowPopup}
        />
    );
}