import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createContext } from 'react';

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
 
class Firebase {
    constructor() {
        app.initializeApp(config);
    
        this.auth = app.auth();
        this.firestore = app.firestore();
    }
 
    // *** Auth API ***
    createUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    signInWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    signOut = () => {
        return this.auth.signOut();
    }
 
    resetPassword = (email) => {
        return this.auth.sendPasswordResetEmail(email);
    }
 
    updatePassword = (password) => {
        return this.auth.currentUser.updatePassword(password); // TODO deprecate these functions and call auth directly?
    }
}
 
export default Firebase;

export const FirebaseContext = createContext(null);