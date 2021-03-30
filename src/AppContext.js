import { createContext, PureComponent } from 'react';
import { getMovieMetadataApi } from './ApiUtilities';
import { ROUTES } from './Constants';
import { getFriendsInfo } from './FirebaseFunctions';

const AppContext = createContext({});

const defaultState = {
    user: null,
    publicUserInfo: null,
    friends: [],
    friendRequests: [],
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
        this.unsubscribeFromPublicUserInfo = db.collection('publicUserInfo').doc(uid).onSnapshot(snap => {
            snap && this.setState({ publicUserInfo: snap.data() });
        });
        this.unsubscribeFromFriendRequests = db.collection('users').doc(uid).collection('friendRequests').onSnapshot(querySnapshot => {
            const newRequests = [];

            querySnapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    const { name, profilePicUrl } = change.doc.data();
                    const request = {
                        uid: change.doc.id,
                        name,
                        profilePicUrl
                    };

                    newRequests.push(request);
                }
            });

            this.setState({ friendRequests: [...this.state.friendRequests, ...newRequests] });
        });

        // retrieve friends
        getFriendsInfo(uid).then((response) => {
            if (response) {
                this.setState({ friends: response.friends });
            }
        }).catch(err => console.log('friends error', err));

        // retrieve movie list
        const snapshot = await db.collection('publicUserInfo').doc(uid)
            .collection('favoriteMovies')
            .orderBy('OrderId')
            .get();

        const favoriteMovies = snapshot.docs.map(doc => doc.data());

        this.setState({ favoriteMovies });
    }

    signOut = (history) => {
        this.unsubscribeFromUser && this.unsubscribeFromUser();
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

    addMovieToList = async ({ imdbID, Title, Year, Poster }) => {
        const OrderId = this.state.favoriteMovies.length;
        const Metadata = await getMovieMetadataApi(imdbID);
        const Genres = Metadata.Genre.split(", ");

        const newFavoriteMovies = [
            ...this.state.favoriteMovies,
            { imdbID, Title, Year, Poster, OrderId, Genres }
        ];

        // TODO dedup newFavoriteMovies incase added twice accidentally
        
        this.setState({ favoriteMovies: newFavoriteMovies });

        this.props.firebase.firestore()
            .collection('publicUserInfo')
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

    addFriend = (id) => {
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
                setHasSentEmailVerification: this.setHasSentEmailVerification,
                addFriend: this.addFriend,
                acceptFriendRequest: this.acceptFriendRequest,
                deleteFriendRequest: this.deleteFriendRequest,
                removeFriend: this.removeFriend
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