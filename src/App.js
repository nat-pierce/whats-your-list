import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

function App() {
    return (
        <Router>
            <div className="app">
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
            </div>
        </Router>
    );
}

export default App;
