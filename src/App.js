import { useContext, useRef, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Redirect, Route, useHistory } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import ViewList from './Pages/ViewList';
import Friends from './Pages/Friends';
import { AppContextProvider } from './AppContext';
import { ROUTES } from './Constants';
import { FirebaseContext } from './Firebase';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';
import Toast from './CommonComponents/Toast';
import { smallScreenMax } from './StyleExports.module.scss';
import Guide from './CommonComponents/Guide';
import AddToHomeScreenPopup from './CommonComponents/AddToHomeScreenPopup';

function App() {
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const appRef = useRef(null);

    const updateWindowDimensions = () => {
        const { innerHeight, innerWidth } = window;

        // If we are on desktop, we need to hardcode height 
        // so we can make only the left side (list) scrollable.
        const height = innerWidth < parseInt(smallScreenMax)
            ? 'auto'
            : `${innerHeight - 4}px` // was overflowing a few pixels...

        appRef.current.style.height = height;
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
                        <Route path={ROUTES.ViewList} component={ViewList} />
                        <Route path={ROUTES.Friends} component={Friends} />
                        <Toast />
                        <Guide />
                        <AddToHomeScreenPopup />
                    </div>
                </Router>
            </AppContextProvider>
        </ThemeProvider>
    );
}

export default App;
