import { createContext, PureComponent } from 'react';
import { ROUTES } from './Constants';

const AppContext = createContext({});

const defaultState = {
    user: null,
    favoriteMovies: []
};

export class AppContextProvider extends PureComponent {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    setUser = (uid) => {
        this.unsubscribeFromUser = this.props.firebase.firestore().collection('users').doc(uid).onSnapshot(snap => {
            snap && this.setState({ user: snap.data() });
        });
    }

    signOut = (history) => {
        this.unsubscribeFromUser && this.unsubscribeFromUser();

        this.props.firebase.auth().signOut().then(() => {
            this.setState(defaultState, () => {
                history.push(ROUTES.Login);
            });
        });
    }

    reorderMovieList = (newList) => {
        this.setState({ favoriteMovies: newList });
    }

    addMovieToList = ({ imdbID, Title, Year, Poster }) => {
        this.setState({ favoriteMovies: [
            ...this.state.favoriteMovies,
            { imdbID, Title, Year, Poster }
        ]});

        /* TODO grab genre from API?
        maybe store these 4 fields in state, and have the chart(s) load async data with spinner
        by listening for updates to list in firestore. (Spinner starts moving when this function is called)
        And then can store all 4 of these in firestore async.
        */
    }

    render() {
        const contextValue = {
            state: this.state,
            actions: {
                setUser: this.setUser,
                signOut: this.signOut,
                addMovieToList: this.addMovieToList,
                reorderMovieList: this.reorderMovieList
            }
        };

        return (
            <AppContext.Provider value={contextValue}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default AppContext