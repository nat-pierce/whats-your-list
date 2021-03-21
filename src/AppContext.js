import { createContext, PureComponent } from 'react';

const AppContext = createContext({});

const defaultState = {};

export default class AppContextProvider extends PureComponent {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    render() {
        const contextValue = {
            state: this.state,
            actions: {}
        };

        return (
            <AppContext.Provider value={contextValue}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
