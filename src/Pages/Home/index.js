import { useContext, memo, useEffect, useState, useRef } from 'react';
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

const Home = memo(({ user }) => {
    const history = useHistory();
    const [isMounted, setIsMounted] = useState(false);
    const firebase = useContext(FirebaseContext);
    const sentEmailVerificationRef = useRef(false);
    const authUser = !sentEmailVerificationRef.current && firebase.auth().currentUser;

    useEffect(() => {
        if (!user) {
            history.push(ROUTES.Login);
        } else {
            setIsMounted(true);
        }
    }, [user, history, setIsMounted]);

    if (!isMounted || !user) {
        return <div>Loading</div>; // Spinner
    }

    if (authUser && !authUser.emailVerified) {
        sentEmailVerificationRef.current = true;

        firebase.auth().currentUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        })
        .catch((err) => console.error(err));

        return (
            <div className='email-verification-message'>
                Email verification sent!
            </div>
        );
    }

    // put header, profile pic, and display name on this page with list
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
        </div>
    )
});

export default function ConnectedHome() {
    const { state } = useContext(AppContext);
    const { user } = state;

    return <Home user={user} />
}