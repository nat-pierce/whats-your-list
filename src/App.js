import { useContext } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
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
                    <Route path={ROUTES.SignUp} component={SignUp} />
                    <Route path={ROUTES.Home} component={Home} />
                </div>
            </Router>
        </AppContextProvider>
    );
}

export default App;
