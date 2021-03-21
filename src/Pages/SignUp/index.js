import { useState } from 'react';
import './SignUp.scss';
import TextInput from '../../CommonComponents/TextInput';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

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
        </div>
    )
}