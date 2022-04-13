import { createContext, PureComponent } from 'react';
import { getMovieMetadataApi } from './ApiUtilities';
import { EVENTS, HOME_TABS, ROUTES } from './Constants';
import { getFriendsInfo } from './FirebaseFunctions';
import { createAccount, log } from './Firebase';

const AppContext = createContext({});

const defaultState = {
    user: null,
    publicUserInfo: null,
    friends: [],
    friendRequests: [],
    favoriteMovies: [],
    suggestedMovies: [],
    isSettingsModalOpen: false,
    hasSentEmailVerification: false,
    currentHomeTab: HOME_TABS.Favorites,
    toastMessage: null
};

export class AppContextProvider extends PureComponent {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    setUser = async (user) => {
        const db = this.props.firebase.firestore();

        // subscribe to user updates
        const userDoc = await db.collection('users').doc(user.uid).get();

        if (userDoc.exists) {
            // retrieve movie list
            const snapshot = await db.collection('publicUserInfo').doc(user.uid)
                .collection('favoriteMovies')
                .orderBy('OrderId')
                .get();

            const favoriteMovies = snapshot.docs.map(doc => doc.data());

            // retrieve friends
            const friendsResponse = await getFriendsInfo(user.uid);
            const friends = friendsResponse
                ? friendsResponse.friends
                : [];

            // set state
            this.setState({ 
                user: userDoc.data(), 
                favoriteMovies,
                friends 
            });
        } else {
            await createAccount(user);

            const newUserDoc = await db.collection('users').doc(user.uid).get();
            this.setState({ user: newUserDoc.data() });
        }

        // subscribe to name and profile pic changes
        this.unsubscribeFromPublicUserInfo = db.collection('publicUserInfo').doc(user.uid).onSnapshot(snap => {
            snap && this.setState({ publicUserInfo: snap.data() });
        });

        // subscribe to friend requests
        this.unsubscribeFromFriendRequests = db.collection('users').doc(user.uid).collection('friendRequests').onSnapshot(querySnapshot => {
            const newRequests = [];

            querySnapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    const alreadyAdded = (newRequests.findIndex(r => r.uid === change.doc.id) > -1) 
                        || (this.state.friendRequests.findIndex(r => r.uid === change.doc.id) > -1);

                    if (!alreadyAdded) {
                        const { name, profilePicUrl } = change.doc.data();
                        const request = {
                            uid: change.doc.id,
                            name,
                            profilePicUrl
                        };

                        newRequests.push(request);
                    }
                }
            });

            this.setState({ friendRequests: [...this.state.friendRequests, ...newRequests] });
        });
    }

    signOut = (history) => {
        this.unsubscribeFromPublicUserInfo && this.unsubscribeFromPublicUserInfo();
        this.unsubscribeFromFriendRequests && this.unsubscribeFromFriendRequests();

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
        const collection = db.collection('publicUserInfo')
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

    setToastMessage = (movie, tabType) => {
        const { Title, Year } = movie;
        const movieName = `${Title} (${Year})`;

        const toastMessage = tabType === HOME_TABS.Favorites
            ? `Added ${movieName} to favorites`
            : `Saved ${movieName} for later`;

        this.setState({ toastMessage });
    }

    addMovieToList = async (movie, tabType, logSource) => {
        const { imdbID, Title, Year, Poster, Genre } = movie;

        log(EVENTS.AddMovie, { 
            source: logSource,
            imdbID,
            tabType 
        });

        // Set OrderId to bottom of list
        const OrderId = this.state.favoriteMovies.length;

        // If the movie doesn't have genre metadata, retrieve it
        let genreString = Genre;
        if (!genreString) {
            const Metadata = await getMovieMetadataApi(imdbID);
            genreString = Metadata.Genre;
        }

        // Prepare the new list of favorite movies
        const Genres = genreString.split(", ");
        const newFavoriteMovies = [
            ...this.state.favoriteMovies,
            { imdbID, Title, Year, Poster, OrderId, Genres }
        ];

        // Remove duplicates
        const uniqueFavoriteMovies = Array.from(new Set(newFavoriteMovies.map(m => m.imdbID)))
            .map(id => {
                return newFavoriteMovies.find(m => m.imdbID === id);
            });
        
        // Add to state
        this.setState({ favoriteMovies: uniqueFavoriteMovies });

        // If it was in the list of suggested movies, remove it
        const suggestedIndex = this.state.suggestedMovies.findIndex(m => m.imdbID === imdbID);
        if (suggestedIndex > -1) {
            const newSuggestedMovies = [...this.state.suggestedMovies];
            newSuggestedMovies.splice(suggestedIndex, 1);

            this.setState({ suggestedMovies: newSuggestedMovies });
        }

        // Persist to database
        this.props.firebase.firestore()
            .collection('publicUserInfo')
            .doc(this.state.user.uid)
            .collection('favoriteMovies')
            .doc(imdbID)
            .set({ imdbID, Title, Year, Poster, OrderId, Genres });

        // Notify user
        this.setToastMessage(movie, tabType);
    }

    removeMovieFromList = async (imdbID, indexToRemove) => {
        log(EVENTS.RemoveMovie);
        const newList = [...this.state.favoriteMovies];
        newList.splice(indexToRemove, 1);

        const newListWithUpdatedOrderIds = newList.map((item, i) => ({ ...item, OrderId: i }));

        this.setState({ favoriteMovies: newListWithUpdatedOrderIds });

        await this.props.firebase.firestore()
            .collection('publicUserInfo')
            .doc(this.state.user.uid)
            .collection('favoriteMovies')
            .doc(imdbID)
            .delete();

        this.updateOrderIds(newListWithUpdatedOrderIds);
    }

    setIsSettingsModalOpen = (isOpen) => {
        this.setState({ isSettingsModalOpen: isOpen });
    }

    addFriend = (id, logSource) => {
        log(EVENTS.AddFriend, {
            source: logSource
        });

        this.props.firebase.firestore()
            .collection('users')
            .doc(id)
            .collection('friendRequests')
            .doc(this.state.user.uid)
            .set({ 
                name: this.state.publicUserInfo.name,
                profilePicUrl: this.state.publicUserInfo.profilePicUrl
            });
    }

    removeFriend = async (id) => {
        log(EVENTS.RemoveFriend);

        await this.props.firebase.firestore()
            .collection('users')
            .doc(this.state.user.uid)
            .collection('friends')
            .doc(id)
            .delete();

        await this.props.firebase.firestore()
            .collection('users')
            .doc(id)
            .collection('friends')
            .doc(this.state.user.uid)
            .delete();

        const newFriends = this.state.friends.filter(f => f.uid !== id);

        this.setState({ friends: newFriends });
    }

    acceptFriendRequest = async (friend) => {
        log(EVENTS.AcceptRequest);

        await this.props.firebase.firestore()
            .collection('users')
            .doc(this.state.user.uid)
            .collection('friends')
            .doc(friend.uid)
            .set({});

        await this.props.firebase.firestore()
            .collection('users')
            .doc(friend.uid)
            .collection('friends')
            .doc(this.state.user.uid)
            .set({});

        this.deleteFriendRequest(friend.uid);

        this.setState({ friends: [...this.state.friends, friend] });
    }

    deleteFriendRequest = (id) => {
        log(EVENTS.DeleteRequest, { id });

        this.props.firebase.firestore()
            .collection('users')
            .doc(this.state.user.uid)
            .collection('friendRequests')
            .doc(id)
            .delete().then(() => {
                const indexInState = this.state.friendRequests.findIndex(r => r.uid === id);
                const newList = [...this.state.friendRequests];

                newList.splice(indexInState, 1);

                this.setState({ friendRequests: newList });
            });
    }

    setSuggestedMovies = (suggestedMovies) => {
        this.setState({ suggestedMovies });
    }

    changeHomeTab = (currentHomeTab) => {
        this.setState({ currentHomeTab });
    }

    render() {
        const contextValue = {
            state: this.state,
            actions: {
                setUser: this.setUser,
                setUserEmail: this.setUserEmail,
                signOut: this.signOut,
                addMovieToList: this.addMovieToList,
                reorderMovieList: this.reorderMovieList,
                removeMovieFromList: this.removeMovieFromList,
                setSuggestedMovies: this.setSuggestedMovies,
                setIsSettingsModalOpen: this.setIsSettingsModalOpen,
                setHasSentEmailVerification: this.setHasSentEmailVerification,
                addFriend: this.addFriend,
                acceptFriendRequest: this.acceptFriendRequest,
                deleteFriendRequest: this.deleteFriendRequest,
                removeFriend: this.removeFriend,
                changeHomeTab: this.changeHomeTab
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