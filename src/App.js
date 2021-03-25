import { useContext, useRef, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Redirect, Route, useHistory } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import { AppContextProvider } from './AppContext';
import { ROUTES } from './Constants';
import { FirebaseContext } from './Firebase';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';


function App() {
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const appRef = useRef(null);

    const updateWindowDimensions = () => {
        const height = window.innerHeight;

        appRef.current.style.height = `${height}px`;
    }

    useEffect(() => {
        updateWindowDimensions();

        window.addEventListener('resize', updateWindowDimensions);

        return () => {
            window.removeEventListener('resize', updateWindowDimensions);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <AppContextProvider firebase={firebase} history={history}>
                <Router>
                    <div className="app" ref={appRef}>
                        <Route exact path="/">
                            <Redirect to={ROUTES.Home} />
                        </Route>
                        <Route path={ROUTES.Login} component={Login} />
                        <Route path={ROUTES.Home} component={Home} />
                    </div>
                </Router>
            </AppContextProvider>
        </ThemeProvider>
    );
}

export default App;
