import { useContext, useRef, useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import ViewList from './Pages/ViewList';
import Friends from './Pages/Friends';
import { AppContextProvider } from './AppContext';
import { LOCAL_STORAGE_PWA_CHROME_POPUP, LOCAL_STORAGE_PWA_SAFARI_POPUP, ROUTES } from './Constants';
import { FirebaseContext } from './Firebase';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';
import Toast from './CommonComponents/Toast';
import { smallScreenMax } from './StyleExports.module.scss';
import Header from './CommonComponents/Header';
import { useServiceWorkerListener } from './Utilities/Hooks';
import AddToHomeScreenSafariPopUp from './CommonComponents/AddToHomeScreenSafariPopup';
import { getCanShowChromePwaPopup, getCanShowSafariPwaPopup } from './Utilities/EnvironmentUtilities';
import SwitchChromePopUp from './CommonComponents/SwitchChromePopup';

function App() {
    const firebase = useContext(FirebaseContext);
    const appRef = useRef(null);

    //#region safari ios popup
    const canShowSafariPwaPopup = getCanShowSafariPwaPopup();
    const [shouldShowSafariPopupInternal, setShouldShowSafariPopupInternal] = useState(canShowSafariPwaPopup);

    const onCloseSafariPopup = () => {
        localStorage.setItem(LOCAL_STORAGE_PWA_SAFARI_POPUP, 'true');
        setShouldShowSafariPopupInternal(false);
    }
    //#endregion

    //#region chrome ios popup
    const canShowChromePwaPopup = getCanShowChromePwaPopup();
    const [shouldShowChromePopupInternal, setShouldShowChromePopupInternal] = useState(canShowChromePwaPopup);

    const onCloseChromePopup = () => {
        localStorage.setItem(LOCAL_STORAGE_PWA_CHROME_POPUP, 'true');
        setShouldShowChromePopupInternal(false);
    }
    //#endregion

    //#region pwa updates
    // https://dev.to/noconsulate/react-pwa-with-workbox-6dl
    const [isUpdateWaiting, setIsUpdateWaiting] = useState(false);
    const [registration, setRegistration] = useState(null);
    const [swListener, setSwListener] = useState({});

    useServiceWorkerListener(setIsUpdateWaiting, setRegistration, setSwListener);

    const onClickUpdate = () => {
        swListener.skipWaiting(registration.waiting);
    }
    //#endregion

    //#region window dimensions
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
    //#endregion

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AppContextProvider firebase={firebase}>
                    <div className="app" ref={appRef}>
                        <Header isUpdateWaiting={isUpdateWaiting} onClickUpdate={onClickUpdate} />
                        <Route exact path="/">
                            <Redirect to={ROUTES.Home} />
                        </Route>
                        <Route path={ROUTES.Login} component={Login} />
                        <Route path={ROUTES.Home} component={Home} />
                        <Route path={ROUTES.ViewList} component={ViewList} />
                        <Route path={ROUTES.Friends} component={Friends} />
                        <Toast />
                        {shouldShowSafariPopupInternal && <AddToHomeScreenSafariPopUp onClose={onCloseSafariPopup} />}
                        {shouldShowChromePopupInternal && <SwitchChromePopUp onClose={onCloseChromePopup} />}
                    </div>
                    </AppContextProvider>
                </Router>
        </ThemeProvider>
    );
}

export default App;
