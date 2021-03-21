import './App.scss';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import Login from './Pages/Login';

function App() {
    return (
        <Router>
            <div className="app">
                <Route path="/login" component={Login} />
            </div>
        </Router>
    );
}

export default App;
