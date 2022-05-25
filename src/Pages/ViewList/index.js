import ViewListProfile from './ViewListProfile';
import { useEffect, useContext, useState, memo } from 'react';
import { FirebaseContext } from '../../Firebase';
import ViewListFavoriteMovies from './ViewListFavoriteMovies';
import Charts from '../Home/Charts';
import AppContext from '../../AppContext';
import { useHistory } from 'react-router';
import { ROUTES } from '../../Constants';

const ViewList = memo(({ uid, setUser }) => {
    const history = useHistory();
    const urlParams = new URLSearchParams(window.location.search);
    const viewId = urlParams.get('id');
    const firebase = useContext(FirebaseContext);
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [name, setName] = useState(null);
    const [viewListMovies, setViewListMovies] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(authUser => {
            setUser(authUser);
        })
    }, [setUser, firebase])

    useEffect(() => {
        if (uid && (viewId === uid)) {
            history.push(ROUTES.Home);
        }

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
    }, [viewId, firebase, history, uid]);

    const shouldShowCharts = !!viewListMovies && (viewListMovies.length > 0);

    return (
        <div className='view-list-page'>
            <div className='upper'>
                <ViewListProfile profilePicUrl={profilePicUrl} name={name} viewId={viewId} />
            </div>
            <div className='lower'>
                <div className='view-list-container'>
                    <ViewListFavoriteMovies viewListMovies={viewListMovies} />
                </div>
                {shouldShowCharts &&
                    <Charts viewListMovies={viewListMovies} />
                }
            </div>
        </div>
    )
});

export default function ConnectedViewList() {
    const { state, actions } = useContext(AppContext);
    const { user } = state;
    const { setUser } = actions;
    const uid = user && user.uid;

    return <ViewList uid={uid} setUser={setUser} />;
}