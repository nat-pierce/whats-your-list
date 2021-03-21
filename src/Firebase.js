import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};
 
class Firebase {
    constructor() {
        app.initializeApp(config);
    
        this.auth = app.auth();
    }
 
    // *** Auth API ***
    createUserWithEmailAndPassword = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password);
    }

    signInWithEmailAndPassword = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password);
    }

    signOut = () => {
        this.auth.signOut();
    }
 
    resetPassword = (email) => {
        this.auth.sendPasswordResetEmail(email);
    }
 
    updatePassword = (password) => {
        this.auth.currentUser.updatePassword(password);
    }
}
 
export default Firebase;