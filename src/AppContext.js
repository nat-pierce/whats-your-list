import { createContext, PureComponent } from 'react';
import { getMovieMetadataApi } from './Utilities/ApiUtilities';
import { ANONYMOUS_USER_ID, EVENTS, HOME_TABS, ROUTES } from './Constants';
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
    hasSentEmailVerification: false,
    currentHomeTab: HOME_TABS.Favorites,
    toastMessage: null,
    // For use of react-joyride:
    isSearchMounted: false,
    isWatchLaterTabHeaderMounted: false
};

export class AppContextProvider extends PureComponent {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    setUser = async (user) => {
        if (!user) {
            this.setState({ user: {
                uid: ANONYMOUS_USER_ID,
                email: null
            }});

            return;
        }


        const db = this.props.firebase.firestore();

        // subscribe to user updates
        const userDoc = await db.collection('users').doc(user.uid).get();

        if (userDoc.exists) {
            // retrieve movie lists
            const favoriteMovies = await getMovieCollection(user.uid, 'favoriteMovies', this.onErrorFirebase);
            const watchLaterMovies = await getMovieCollection(user.uid, 'watchLaterMovies', this.onErrorFirebase);

            // set state
            this.setState({ 
                user: userDoc.data(), 
                favoriteMovies,
                watchLaterMovies
            });
        } else {
            await createAccount(user, this.onErrorFirebase);

            const newUserDoc = await db.collection('users').doc(user.uid).get();
            
            this.setState({ user: newUserDoc.data() });
        }

        // subscribe to name and profile pic changes
        this.unsubscribeFromPublicUserInfo = db
            .collection('publicUserInfo')
            .doc(user.uid)
            .onSnapshot(querySnapshot => {
                querySnapshot && this.setState({ publicUserInfo: querySnapshot.data() });
            });

        // // subscribe to friend requests
        this.unsubscribeFromFriendRequests = db
            .collection('users')
            .doc(user.uid)
            .collection('friendRequests')
            .onSnapshot(querySnapshot => {
                const friendRequests = [...this.state.friendRequests];

                querySnapshot.docChanges().forEach(change => {
                    const changeType = change.type;
                    const changeDocId = change.doc.id;
                    const changeDocIndex = friendRequests.findIndex(r => r.uid === changeDocId);

                    if ((changeType === 'added') && (changeDocIndex === -1)) {
                        const { name, profilePicUrl } = change.doc.data();

                        const request = {
                            uid: change.doc.id,
                            name,
                            profilePicUrl
                        };

                        friendRequests.unshift(request);
                    } else if ((change.type === 'removed') && (changeDocIndex >= 0)) {
                        friendRequests.splice(changeDocIndex, 1);
                    }
                });
                
                this.setState({ friendRequests });
            });

        // subscribe to friends list (to show accepted requests in real-time)
        this.unsubscribeFromFriends = db.collection('users').doc(user.uid).collection('friends').onSnapshot(async querySnapshot => {
            const friends = [...this.state.friends];

            const changes = await querySnapshot.docChanges();
            for (const change of changes) {
                const changeType = change.type;
                const changeDocId = change.doc.id;
                const changeDocIndex = friends.findIndex(r => r.uid === changeDocId);

                if ((changeType === 'added') && (changeDocIndex === -1)) {
                    // Instead of storing name and profilePic on friend object, 
                    // we access it here to make sure it's up to date
                    const friendDoc = await db.collection('publicUserInfo').doc(change.doc.id).get();
                    const { name, profilePicUrl } = friendDoc.data();

                    const friend = { 
                        uid: change.doc.id,
                        name,
                        profilePicUrl
                    };

                    friends.unshift(friend);
                } else if ((change.type === 'removed') && (changeDocIndex >= 0)) {
                    friends.splice(changeDocIndex, 1);
                }
            }
            
            this.setState({ friends });
        });
    }

    signOut = () => {
        this.unsubscribeFromPublicUserInfo && this.unsubscribeFromPublicUserInfo();
        this.unsubscribeFromFriendRequests && this.unsubscribeFromFriendRequests();
        this.unsubscribeFromFriends && this.unsubscribeFromFriends();

        this.props.firebase.auth().signOut().then(() => {
            this.setState(defaultState, () => {
                this.props.history.push(ROUTES.Login);
            });
        });
    }

    setHasSentEmailVerification = (hasSentEmailVerification) => {
        this.setState({ hasSentEmailVerification });
    }

    reorderMovieList = (newListWithUpdatedOrderIds, tabType) => {
        const listName = getCollectionName(tabType);

        this.setState({ [listName]: newListWithUpdatedOrderIds });

        updateOrderIds(this.state.user.uid, newListWithUpdatedOrderIds, listName, this.onErrorFirebase);
    }

    setToastMessage = (movie, tabType) => {
        const { Title, Year } = movie;
        const movieName = `${Title} (${Year})`;

        const toastMessage = tabType === HOME_TABS.Favorites
            ? `Added ${movieName} to Favorites`
            : `Added ${movieName} to Watch Later`;

        this.setState({ toastMessage });
    }

    addMovieToList = async (movie, tabType, logSource, orderId = undefined) => {
        const { imdbID, Title, Year, Poster, Genre } = movie;

        log(EVENTS.AddMovie, { 
            source: logSource,
            imdbID,
            tabType 
        });

        // Choose state and db property name (matches in both)
        const listName = getCollectionName(tabType);

        // Set OrderId to bottom of list or specified override
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
        addMovieToCollection(this.state.user.uid, listName, movieToAdd, this.onErrorFirebase);

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

        await removeMovieFromCollection(this.state.user.uid, listName, imdbID, this.onErrorFirebase);

        updateOrderIds(this.state.user.uid, newListWithUpdatedOrderIds, listName, this.onErrorFirebase);
    }

    // If a poster doesn't load for a user, make an attempt to replace it
    replaceMoviePoster = async (movie, tabType) => {
        const { Poster } = await getMovieMetadataApi(movie.imdbID);

        const movieToReplace = { ...movie, Poster };
        const listName = getCollectionName(tabType);

        // replace in db
        addMovieToCollection(
            this.state.user.uid, 
            listName, 
            movieToReplace,
            this.onErrorFirebase
        );

        // replace in state
        const newList = this.state[listName].map(m => {
            if (m.imdbID === movieToReplace.imdbID) {
                return movieToReplace;
            }

            return m;
        });

        this.setState({ [listName]: newList });
        
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
    
    setIsSearchMounted = (isSearchMounted) => {
        this.setState({ isSearchMounted });
    }

    setIsWatchLaterTabHeaderMounted = (isWatchLaterTabHeaderMounted) => {
        this.setState({ isWatchLaterTabHeaderMounted });
    }

    onErrorFirebase = () => {
        this.props.history.go(0);
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
                replaceMoviePoster: this.replaceMoviePoster,
                setSuggestedMovies: this.setSuggestedMovies,
                setHasSentEmailVerification: this.setHasSentEmailVerification,
                addFriend: this.addFriend,
                acceptFriendRequest: this.acceptFriendRequest,
                deleteFriendRequest: this.deleteFriendRequest,
                removeFriend: this.removeFriend,
                changeHomeTab: this.changeHomeTab,
                setIsSearchMounted: this.setIsSearchMounted,
                setIsWatchLaterTabHeaderMounted: this.setIsWatchLaterTabHeaderMounted
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