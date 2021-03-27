import { createContext, PureComponent } from 'react';
import { getMovieMetadataApi } from './ApiUtilities';
import { ROUTES } from './Constants';

const AppContext = createContext({});

const defaultState = {
    user: null,
    favoriteMovies: [],
    isSettingsModalOpen: false,
    hasSentEmailVerification: false
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

    setHasSentEmailVerification = (hasSentEmailVerification) => {
        this.setState({ hasSentEmailVerification });
    }

    updateOrderIds = (newListWithUpdatedOrderIds) => {
        const db = this.props.firebase.firestore();
        const batch = db.batch();
        const collection = db.collection('users')
            .doc(this.state.user.uid)
            .collection('favoriteMovies');

        newListWithUpdatedOrderIds.forEach(movie => {
            const docRef = collection.doc(movie.imdbID);
            batch.update(docRef, { OrderId: movie.OrderId });
        });

        batch.commit();
    }

    reorderMovieList = (newListWithUpdatedOrderIds) => {
        this.setState({ favoriteMovies: newListWithUpdatedOrderIds });

        this.updateOrderIds(newListWithUpdatedOrderIds);
    }

    addMovieToList = async ({ imdbID, Title, Year, Poster }) => {
        const OrderId = this.state.favoriteMovies.length;
        const Metadata = await getMovieMetadataApi(imdbID);
        const Genres = Metadata.Genre.split(", ");
        
        this.setState({ favoriteMovies: [
            ...this.state.favoriteMovies,
            { imdbID, Title, Year, Poster, OrderId, Genres }
        ]});

        this.props.firebase.firestore()
            .collection('users')
            .doc(this.state.user.uid)
            .collection('favoriteMovies')
            .doc(imdbID)
            .set({ imdbID, Title, Year, Poster, OrderId, Genres });
    }

    removeMovieFromList = async (imdbID, indexToRemove) => {
        const newList = [...this.state.favoriteMovies];
        newList.splice(indexToRemove, 1);

        const newListWithUpdatedOrderIds = newList.map((item, i) => ({ ...item, OrderId: i }));

        this.setState({ favoriteMovies: newListWithUpdatedOrderIds });

        await this.props.firebase.firestore()
            .collection('users')
            .doc(this.state.user.uid)
            .collection('favoriteMovies')
            .doc(imdbID)
            .delete();

        this.updateOrderIds(newListWithUpdatedOrderIds);
    }

    setIsSettingsModalOpen = (isOpen) => {
        this.setState({ isSettingsModalOpen: isOpen });
    }

    render() {
        const contextValue = {
            state: this.state,
            actions: {
                setUser: this.setUser,
                signOut: this.signOut,
                addMovieToList: this.addMovieToList,
                reorderMovieList: this.reorderMovieList,
                removeMovieFromList: this.removeMovieFromList,
                setIsSettingsModalOpen: this.setIsSettingsModalOpen,
                setHasSentEmailVerification: this.setHasSentEmailVerification
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