export const ROUTES = {
    Login: "/login",
    Home: "/home",
    ViewList: "/viewlist",
    Friends: "/friends"
};

export const MAX_NUM_MOVIES = 100;

export const EVENTS = {
    AddMovie: "ADD_MOVIE",
    RemoveMovie: "REMOVE_MOVIE",
    AddFriend: "ADD_FRIEND",
    RemoveFriend: "REMOVE_FRIEND",
    AcceptRequest: "ACCEPT_REQUEST",
    DeleteRequest: "DELETE_REQUEST",
    ResendEmail: "RESEND_EMAIL"
};

export const BASE_URL = process.env.NODE_ENV === 'production'
    ? "https://whatsyourlist.com"
    : "http://localhost:3000";

export const API_HOST_URL = 'movie-database-alternative.p.rapidapi.com';

export const HOME_TABS = {
    Favorites: 'FAVORITES',
    WatchLater: 'WATCH_LATER'
};

export const ALL_GENRES_FILTER = 'All';