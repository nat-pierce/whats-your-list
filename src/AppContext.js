import { createContext, PureComponent } from 'react';
import { ROUTES } from './Constants';

const AppContext = createContext({});

const defaultState = {
    isSignedIn: false
};

export class AppContextProvider extends PureComponent {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    signOut = (history) => {
        this.props.firebase.auth().signOut().then(() => {
            history.push(ROUTES.Login);
        });
    }

    render() {
        const contextValue = {
            state: this.state
        };

        return (
            <AppContext.Provider value={contextValue}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default AppContext