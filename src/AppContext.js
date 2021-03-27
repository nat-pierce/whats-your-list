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

    setUser = async (uid) => {
        const db = this.props.firebase.firestore();

        // subscribe to user updates
        this.unsubscribeFromUser = db.collection('users').doc(uid).onSnapshot(snap => {
            snap && this.setState({ user: snap.data() });
        });

        // retrieve movie list
        const snapshot = await db.collection('users').doc(uid)
            .collection('favoriteMovies')
            .orderBy('OrderId')
            .get();

        const favoriteMovies = snapshot.docs.map(doc => doc.data());

        this.setState({ favoriteMovies });
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

        const db = this.props.firebase.firestore();
        const batch = db.batch();
        const collection = db.collection('users')
            .doc(this.state.user.uid)
            .collection('favoriteMovies');

        newList.forEach(movie => {
            const docRef = collection.doc(movie.imdbID);
            batch.update(docRef, { OrderId: movie.OrderId });
        });

        batch.commit();
    }

    addMovieToList = ({ imdbID, Title, Year, Poster }) => {
        const OrderId = this.state.favoriteMovies.length;

        this.setState({ favoriteMovies: [
            ...this.state.favoriteMovies,
            { imdbID, Title, Year, Poster, OrderId }
        ]});

        this.props.firebase.firestore()
            .collection('users')
            .doc(this.state.user.uid)
            .collection('favoriteMovies')
            .doc(imdbID)
            .set({ imdbID, Title, Year, Poster, OrderId });
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