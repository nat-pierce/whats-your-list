import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AppContextProvider from './AppContext';
import { ROUTES } from './Constants';

function App() {
    return (
        <AppContextProvider>
            <Router>
                <div className="app">
                    <Route path={ROUTES.Login} component={Login} />
                    <Route path={ROUTES.SignUp} component={SignUp} />
                </div>
            </Router>
        </AppContextProvider>
    );
}

export default App;
