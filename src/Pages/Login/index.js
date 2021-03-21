import { useState } from 'react';
import Button from '@material-ui/core/Button';
import './Login.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Constants';
import TextInput from '../../CommonComponents/TextInput';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                <Button className='login-button' variant="contained" color="primary">
                    Log In
                </Button>
            </div>
            <div className='signup-section'>
                <div>Are you new here?</div>
                <Link to={ROUTES.SignUp}>Sign Up</Link>
            </div>
        </div>
    );
}