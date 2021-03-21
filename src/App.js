import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AppContextProvider from './AppContext';

function App() {
    return (
        <AppContextProvider>
            <Router>
                <div className="app">
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                </div>
            </Router>
        </AppContextProvider>
    );
}

export default App;
