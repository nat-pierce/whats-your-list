import { createContext, PureComponent } from 'react';
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

    render() {
        const contextValue = {
            state: this.state,
            actions: {
                setUser: this.setUser,
                signOut: this.signOut
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