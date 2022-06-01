import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/storage'; 
import 'firebase/analytics';
import { createContext } from 'react';
import { getFirstAndLastName } from './Utilities/CommonUtilities';

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

if (window.location.hostname === "localhost") {
    app.auth().useEmulator("http://localhost:9099");
    app.functions().useEmulator("localhost", 5001);
    app.firestore().settings({
        host: "localhost:8080",
        ssl: false
    });
    app.storage().useEmulator("localhost", 9199);
  }
 
export default app;

export const FirebaseContext = createContext(null);

export const log = process.env.NODE_ENV === 'production'
    ? app.analytics().logEvent
    : console.log;

export const createAccount = async (user, onError) => {
    const userInfo = {
        uid: user.uid,
        email: user.email
    };

    try {
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
    } catch (error) {
        console.error(error);

        onError();
    }
}

export const getMovieCollection = async (userId, collectionName, onError) => {
    try {
        const snapshot = await app.firestore().collection('publicUserInfo')
            .doc(userId)
            .collection(collectionName)
            .orderBy('OrderId')
            .get();

        const movies = snapshot.docs.map(doc => doc.data());

        return movies;
    } catch (error) {
        console.error(error);
        
        onError();
    }
}

// Adds OR replaces doc in collection
export const addMovieToCollection = async (userId, collectionName, movie, onError) => {
    try {
        await app.firestore().collection('publicUserInfo')
            .doc(userId)
            .collection(collectionName)
            .doc(movie.imdbID)
            .set(movie); 
    } catch (error) {
        console.error(error);
        
        onError();
    }
}

export const removeMovieFromCollection = async (userId, collectionName, imdbID, onError) => {
    try {
        await app.firestore()
                .collection('publicUserInfo')
                .doc(userId)
                .collection(collectionName)
                .doc(imdbID)
                .delete();
    }  catch (error) {
        console.error(error);
        
        onError();
    }
}

export const updateOrderIds = (userId, newList, listName, onError) => {
    try {
        const db = app.firestore();
        const batch = db.batch();
        const collection = db.collection('publicUserInfo')
            .doc(userId)
            .collection(listName);

        newList.forEach(movie => {
            const docRef = collection.doc(movie.imdbID);
            batch.update(docRef, { OrderId: movie.OrderId });
        });

        batch.commit();
    } catch (error) {
        console.error(error);
        
        onError();
    }
}