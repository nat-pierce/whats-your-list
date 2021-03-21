import TextInput from '../../CommonComponents/TextInput';
import { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../Firebase';

export default function Profile() {
    const firebase = useContext(FirebaseContext);
    const [displayName, setDisplayName] = useState('');

    console.log('f', firebase.auth());

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            console.log('u', user);
        });
    }, [firebase]);

    return (
        <div className='profile-page'>
            <TextInput 
                label='Display name'
                value={displayName}
                onChange={setDisplayName}
            />
        </div>
    );
}