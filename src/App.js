import { useContext } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import { AppContextProvider } from './AppContext';
import { ROUTES } from './Constants';
import { FirebaseContext } from './Firebase';

function App() {
    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    return (
        <AppContextProvider firebase={firebase} history={history}>
            <Router>
                <div className="app">
                    <Route path={ROUTES.Login} component={Login} />
                    <Route path={ROUTES.Home} component={Home} />
                    <Route path={ROUTES.Profile} component={Profile} />
                </div>
            </Router>
        </AppContextProvider>
    );
}

export default App;
