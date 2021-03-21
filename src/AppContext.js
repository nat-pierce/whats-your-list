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

    setUser = (user, history) => {
        this.setState({ user }, () => {
            history && history.push(ROUTES.Home);
        });
    }

    // TODO move this to header?
    signOut = (history) => {
        this.props.firebase.signOut().then(() => {
            history.push(ROUTES.Login);
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