import Button from '@material-ui/core/Button';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { ROUTES } from '../../Constants';
import { FirebaseContext } from '../../Firebase';

export default function Home() {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth();

    console.log('a', auth);

    // TODO
    // useEffect(() => {
    //     if (!auth.currentUser.emailVerified) {
    //         auth.currentUser.sendEmailVerification()
    //             .then(() => {
                    
    //             })
    //             .catch((err) => console.error(err));
    //     }
    // }, [auth]);

    const onSignOut = () => {
        auth.signOut().then(() => {
            history.push(ROUTES.Login);
        });
    }

    return (
        <div className='home-page'>
            Home

            <Button color="primary" onClick={onSignOut}>
                Sign Out
            </Button>
        </div>
    )
}