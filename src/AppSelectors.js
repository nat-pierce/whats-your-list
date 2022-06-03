import { ANONYMOUS_USER_ID, HOME_TABS } from "./Constants";

export function getIsSignedIn(state) {
    const uid = state.user?.uid;

    return !!uid && (uid !== ANONYMOUS_USER_ID);
}

// This will still return true for anonymous users
export function getHasAttemptedSignIn(state) {
    return !!state.user?.uid;
}

export function getShouldGuideStepSearch({ 
    isSearchMounted, 
    favoriteMovies 
}) {
    return isSearchMounted && !favoriteMovies.length;
}

export function getShouldGuideStepWatchLater({ 
    isWatchLaterTabHeaderMounted, 
    favoriteMovies,
    watchLaterMovies,
    currentHomeTab 
}) {
    return isWatchLaterTabHeaderMounted 
        && favoriteMovies.length 
        && !watchLaterMovies.length 
        && (currentHomeTab !== HOME_TABS.WatchLater);
}

export function getShouldGuideStepSecondWatchLater({ 
    isSearchMounted,
    watchLaterMovies,
    currentHomeTab 
}) {
    return isSearchMounted 
        && !watchLaterMovies.length 
        && (currentHomeTab === HOME_TABS.WatchLater);
}