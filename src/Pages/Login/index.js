import { useState, memo } from 'react';
import Button from '@material-ui/core/Button';
import './Login.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Constants';
import TextInput from '../../CommonComponents/TextInput';
import { useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import { useEffect } from 'react';
import AppContext from '../../AppContext';

const Login = memo(({ setUser }) => {
    const firebase = useContext(FirebaseContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user.uid);
            }
        })
    }, [firebase, setUser]);

    const onSubmit = (e) => {
        firebase.signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                setUser(user.uid);
            })
            .catch((err) => {
                setError(err.message);
            });

        e.preventDefault();
    }

    return (
        <div className="login-page">
            <div className='landing-header'>
                <h1>What's Your List?</h1>
                <h2>Share and compare your favorite movies with friends</h2>
            </div>
            <div className='login-section'>
                <h1>Log In</h1>
                <TextInput 
                    className='email-input' 
                    label="Email" 
                    value={email}
                    onChange={setEmail}
                />
                <TextInput 
                    className='password-input' 
                    label="Password"
                    value={password}
                    onChange={setPassword} 
                />
                <Button color="primary">
                    Forgot password?
                </Button>
                {error && <div>{error}</div>}
                <Button 
                    className='login-button' 
                    variant="contained" 
                    color="primary"
                    onClick={onSubmit}>
                    Log In
                </Button>
            </div>
            <div className='signup-section'>
                <div>Are you new here?</div>
                <Link to={ROUTES.SignUp}>Sign Up</Link>
            </div>
        </div>
    );
})

export default function ConnectedLogin() {
    const { actions } = useContext(AppContext);
    const { setUser } = actions;

    return <Login setUser={setUser} />
}