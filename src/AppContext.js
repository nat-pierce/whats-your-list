import { createContext, PureComponent, useContext } from 'react';
import { FirebaseContext } from './Firebase';
import { ROUTES } from './Constants';

const AppContext = createContext({});

const defaultState = {
    user: null
};

export class AppContextProvider extends PureComponent {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    setUser = (uid) => {
        this.unsubscribeFromUser = this.props.firebase.firestore
            .collection('users')
            .doc(uid)
            .onSnapshot(snap => {
                snap && this.setState({ user: snap.data() });
            });

        this.props.history.push(ROUTES.Home);
    }

    signOut = (navigation) => {
        this.unsubscribeFromUser();

        this.props.firebase.signOut().then(() => {
            this.props.history.push(ROUTES.Login);
        });
    }

    render() {
        const contextValue = {
            state: this.state,
            actions: {
                setUser: this.setUser
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