import { useState } from 'react';
import './SignUp.scss';
import TextInput from '../../CommonComponents/TextInput';
import Button from '@material-ui/core/Button';
import { useContext } from 'react';
import { FirebaseContext } from '../../Firebase';

export default function SignUp() {
    const firebase = useContext(FirebaseContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (e) => {
        // TODO input validation
        
        firebase.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                // worked
            })
            .catch(err => {
                setError(err.message);
            });
        
        e.preventDefault();
    }

    return (
        <div className='sign-up-page'>
            <h1>Sign Up</h1>
            <TextInput 
                label="Name" 
                value={name}
                onChange={setName}
            />
            <TextInput 
                label="Email" 
                value={email}
                onChange={setEmail} 
            />
            <TextInput 
                label="Password" 
                value={password}
                onChange={setPassword} 
            />
            <TextInput 
                label="Confirm password" 
                value={passwordConfirm}
                onChange={setPasswordConfirm}
            />
            {error && <div>{error}</div>}
            <Button variant="contained" color="primary" onClick={onSubmit}>
                Sign Up
            </Button>
        </div>
    )
}