import { useContext, memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { ROUTES } from '../../Constants';
import AppContext from '../../AppContext';
import Header from './Header';

const Home = memo(({ user, isAppMounted }) => {
    const history = useHistory();

    useEffect(() => {
        if (isAppMounted && !user) {
            history.push(ROUTES.Login);
        }
    }, [user, isAppMounted, history]);

    if (!user) {
        return <div>Loading</div>; // Spinner
    }

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

    // put header, profile pic, and display name on this page with list
    return (
        <div className='home-page'>
            <Header />
        </div>
    )
});

export default function ConnectedHome() {
    const { state } = useContext(AppContext);
    const { user, isAppMounted } = state;

    return <Home user={user} isAppMounted={isAppMounted} />
}