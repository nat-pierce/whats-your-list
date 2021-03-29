import { useContext, memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { ROUTES } from '../../Constants';
import AppContext from '../../AppContext';
import Header from './Header';
import Profile from './Profile';
import { FirebaseContext } from '../../Firebase';
import FavoriteList from './FavoriteList';
import SearchBar from './SearchBar';
import Charts from './Charts';
import Settings from './Settings';
import Button from '@material-ui/core/Button';

const Home = memo(({ user, hasSentEmailVerification, setHasSentEmailVerification }) => {
    const history = useHistory();
    const [isMounted, setIsMounted] = useState(false);
    const firebase = useContext(FirebaseContext);
    const authUser = firebase.auth().currentUser;

    useEffect(() => {
        if (!user && !isMounted) {
            history.push(ROUTES.Login);
        } else {
            setIsMounted(true);
        }
    }, [user, history, setIsMounted, isMounted]);

    if (!isMounted || !user) {
        return <div>Loading</div>; // TODO Spinner
    }

    const sendConfirmationEmail = () => {
        firebase.auth().currentUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        })
        .catch((err) => console.error(err));
    }

    if (authUser && !authUser.emailVerified) {
        if (!hasSentEmailVerification) {
            console.log('here');
            sendConfirmationEmail();
            setHasSentEmailVerification(true);
        }

        return (
            <div className='email-verification-page'>
                <Header />
                <div className='message'>Email verification sent!</div>
                <Button color="primary" variant="contained" onClick={sendConfirmationEmail}>
                    Send again
                </Button>
                <Settings />
            </div>
        );
    }

    return (
        <div className='home-page'>
            <Header />
            <div className='main-content'>
                <div className='upper'>
                    <Profile />
                    <SearchBar />
                </div>
                <div className='lower'>
                    <FavoriteList />
                    <Charts />
                </div>
            </div>
            <Settings />
        </div>
    )
});

export default function ConnectedHome() {
    const { state, actions } = useContext(AppContext);
    const { user, hasSentEmailVerification } = state;
    const { setHasSentEmailVerification } = actions;

    return <Home 
        user={user} 
        hasSentEmailVerification={hasSentEmailVerification}
        setHasSentEmailVerification={setHasSentEmailVerification} />
}