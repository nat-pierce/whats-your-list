import Header from '../Home/Header';
import ViewListProfile from './ViewListProfile';
import './ViewList.scss';
import { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../Firebase';
import ViewListFavoriteMovies from './ViewListFavoriteMovies';

export default function ViewList() {
    const urlParams = new URLSearchParams(window.location.search);
    const viewId = urlParams.get('id');
    const firebase = useContext(FirebaseContext);
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [name, setName] = useState(null);
    const [viewListMovies, setViewListMovies] = useState(null);

    useEffect(() => {
        if (viewId) {
            firebase.firestore()
                .collection('publicUserInfo')
                .doc(viewId)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const publicUserInfo = doc.data();

                        setProfilePicUrl(publicUserInfo.profilePicUrl);
                        setName(publicUserInfo.name);

                        firebase.firestore()
                            .collection('publicUserInfo')
                            .doc(viewId)
                            .collection('favoriteMovies')
                            .orderBy('OrderId')
                            .get()
                            .then(snapshot => {
                                const movies = snapshot.docs.map(doc => doc.data());

                                setViewListMovies(movies)
                            });
                    }
                });
        }
    }, [viewId, firebase])

    return (
        <div className='view-list-page'>
            <Header />
            <div className='main-content'>
                <div className='upper'>
                    <ViewListProfile profilePicUrl={profilePicUrl} name={name} />
                </div>
                <div className='lower'>
                    <ViewListFavoriteMovies viewListMovies={viewListMovies} />
                </div>
            </div>
        </div>
    )
}