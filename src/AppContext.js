import { createContext, PureComponent } from 'react';
import { getMovieMetadataApi } from './Utilities/ApiUtilities';
import { EVENTS, HOME_TABS, ROUTES } from './Constants';
import { getFriendsInfo } from './FirebaseFunctions';
import { addMovieToCollection, createAccount, getMovieCollection, log, removeMovieFromCollection, updateOrderIds } from './Firebase';
import uniqBy from 'lodash.uniqby';
import { getCollectionName } from './Utilities/CommonUtilities';

const AppContext = createContext({});

const defaultState = {
    user: null,
    publicUserInfo: null,
    friends: [],
    friendRequests: [],
    favoriteMovies: [],
    watchLaterMovies: [],
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
            // retrieve movie lists
            const favoriteMovies = await getMovieCollection(user.uid, 'favoriteMovies');
            const watchLaterMovies = await getMovieCollection(user.uid, 'watchLaterMovies');

            // retrieve friends
            const friendsResponse = await getFriendsInfo(user.uid);
            const friends = friendsResponse
                ? friendsResponse.friends
                : [];

            // set state
            this.setState({ 
                user: userDoc.data(), 
                favoriteMovies,
                watchLaterMovies,
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

    reorderMovieList = (newListWithUpdatedOrderIds, tabType) => {
        const listName = getCollectionName(tabType);

        this.setState({ [listName]: newListWithUpdatedOrderIds });

        updateOrderIds(this.state.user.id, newListWithUpdatedOrderIds, listName);
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

        // Choose state and db property name (matches in both)
        const listName = getCollectionName(tabType);

        // Set OrderId to bottom of list
        const OrderId = this.state[listName].length;

        // If the movie doesn't have genre metadata, retrieve it
        let genreString = Genre;
        if (!genreString) {
            const Metadata = await getMovieMetadataApi(imdbID);
            genreString = Metadata.Genre;
        }

        // Construct movie object
        const Genres = genreString.split(", ");
        const movieToAdd = { imdbID, Title, Year, Poster, OrderId, Genres };

        // If it was in the list of suggested movies, remove it
        const suggestedIndex = this.state.suggestedMovies.findIndex(m => m.imdbID === imdbID);
        if (suggestedIndex > -1) {
            const newSuggestedMovies = [...this.state.suggestedMovies];
            newSuggestedMovies.splice(suggestedIndex, 1);

            this.setState({ suggestedMovies: newSuggestedMovies });
        }

        // Construct new list
        const newMoviesList = [...this.state[listName], movieToAdd];
        const uniqueMoviesList = uniqBy(newMoviesList, 'imdbID');
        
        // Add to state and db
        this.setState({ [listName]: uniqueMoviesList });
        addMovieToCollection(this.state.user.uid, listName, movieToAdd);

        // Notify user
        this.setToastMessage(movieToAdd, tabType);
    }

    removeMovieFromList = async (imdbID, indexToRemove, tabType) => {
        log(EVENTS.RemoveMovie);

        const listName = getCollectionName(tabType);

        const newList = [...this.state[listName]];
        newList.splice(indexToRemove, 1);

        const newListWithUpdatedOrderIds = newList.map((item, i) => ({ ...item, OrderId: i }));

        this.setState({ [listName]: newListWithUpdatedOrderIds });

        await removeMovieFromCollection(this.state.user.id, listName, imdbID);

        updateOrderIds(this.state.user.id, newListWithUpdatedOrderIds, listName);
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