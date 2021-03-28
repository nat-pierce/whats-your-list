import Header from '../Home/Header';
import ViewListProfile from './ViewListProfile';
import './ViewList.scss';
import { useEffect } from 'react';
import { useContext } from 'react';
import { FirebaseContext } from '../../Firebase';

export default function ViewList() {
    const urlParams = new URLSearchParams(window.location.search);
    const viewId = urlParams.get('id');
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        if (viewId) {
            firebase.firestore()
                .collection('publicUserInfo')
                .doc(viewId)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        console.log(doc.data());
                    }
                })
        }
    }, [viewId, firebase])

    return (
        <div className='view-list-page'>
            <Header />
            <div className='main-content'>
                <div className='upper'>
                    <ViewListProfile />
                </div>
                <div className='lower'>
                    
                </div>
            </div>
        </div>
    )
}