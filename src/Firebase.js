import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'; 
import 'firebase/analytics';
import { createContext } from 'react';
import { getFirstAndLastName } from './Utilities';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

app.initializeApp(config);
 
export default app;

export const FirebaseContext = createContext(null);

export const log = process.env.NODE_ENV === 'production'
    ? app.analytics().logEvent
    : console.log;

export const createAccount = async (user) => {
    const userInfo = {
        uid: user.uid,
        email: user.email
    };

    await app.firestore().collection('users')
        .doc(user.uid)
        .set(userInfo);

    const fullName = user.displayName;
    const [firstName, lastName] = getFirstAndLastName(fullName);

    await app.firestore().collection('publicUserInfo')
        .doc(user.uid)
        .set({ 
            name: fullName,
            firstName,
            lastName,
            profilePicUrl: null 
        });
}