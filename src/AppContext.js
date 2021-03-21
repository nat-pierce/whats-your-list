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

    setUser = (uid, history) => {
        this.unsubscribeFromUser = this.props.firebase.firestore
            .collection('users')
            .doc(uid)
            .onSnapshot(snap => {
                snap && this.setState({ user: snap.data() });
            });

        history.push(ROUTES.Home);
    }

    signOut = (navigation, history) => {
        this.unsubscribeFromUser();

        this.props.firebase.signOut().then(() => {
            history.push(ROUTES.Login);
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