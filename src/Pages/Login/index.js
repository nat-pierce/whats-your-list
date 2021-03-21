import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Login.scss';

export default function Login() {
    return (
        <div className="login-page">
            <div className='landing-header'>
                <h1>What's Your List?</h1>
                <h2>Share and compare your favorite movies with friends</h2>
            </div>
            <div className='login-section'>
                <h1>Log In</h1>
                <TextField className='email-input' label="Email" variant="outlined" />
                <TextField className='password-input' label="Password" variant="outlined" />
                <Button color="primary">
                    Forgot password?
                </Button>
                <Button className='login-button' variant="contained" color="primary">
                    Log In
                </Button>
            </div>
            <div className='signup-section'>
                <div>Are you new here?</div>
                <Button color="primary">
                    Sign Up
                </Button>
            </div>
        </div>
    );
}