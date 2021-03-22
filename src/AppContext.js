import { createContext, PureComponent } from 'react';
import { ROUTES } from './Constants';

const AppContext = createContext({});

const defaultState = {
    user: null,
    isAppMounted: false
};

export class AppContextProvider extends PureComponent {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(authUser => {
            if (authUser) {
                this.setState({ user: authUser, isAppMounted: true });
            } else {
                this.setState({ user: null, isAppMounted: true });
            }
        })
    }

    // TODO move this to header?
    signOut = (history) => {
        this.props.firebase.signOut().then(() => {
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