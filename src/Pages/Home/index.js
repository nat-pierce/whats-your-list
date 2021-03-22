import { useContext, memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { ROUTES } from '../../Constants';
import AppContext from '../../AppContext';
import Header from './Header';
import Profile from './Profile';

const Home = memo(({ user }) => {
    const history = useHistory();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!user) {
            history.push(ROUTES.Login);
        } else {
            setIsMounted(true);
        }
    }, [user, history, setIsMounted]);

    // if (!user) {
    //     return <div>Loading</div>; // Spinner
    // }

    // TODO uncomment tomorrow
    // if (!user.emailVerified) {
    //     auth.currentUser.sendEmailVerification({
    //         url: ROUTES.Login
    //     })
    //     .catch((err) => console.error(err));

    //     return (
    //         <div className='email-verification-message'>
    //             Email verification sent!
    //         </div>
    //     );
    // }

    console.log('u', user);

    if (!isMounted) {
        return <div>Loading</div> // TODO spinner
    }

    // put header, profile pic, and display name on this page with list
    return (
        <div className='home-page'>
            <Header />
            <Profile />
        </div>
    )
});

export default function ConnectedHome() {
    const { state } = useContext(AppContext);
    const { user } = state;

    return <Home user={user} />
}