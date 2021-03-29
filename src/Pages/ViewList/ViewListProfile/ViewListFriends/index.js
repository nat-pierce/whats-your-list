import { useEffect, useContext } from 'react';
import { FirebaseContext } from '../../../../Firebase';
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';

export default function ViewListFriends({ viewId }) {
    const firebase = useContext(FirebaseContext);
    const [viewListFriends, setViewListFriends] = useState([]);

    useEffect(() => {
        if (viewListFriends.length) { return };

        const db = firebase.firestore();

        // TODO do one query for all publicUserInfo, use firebase function with firestore.getAll (also in AppContext)
        // getFriendsWithMetadata(userId)
        // then change security rules
        db.collection('users').doc(viewId).collection('friends').get().then(querySnapshot => {
            querySnapshot.docs.map(doc => {
                db.collection('publicUserInfo').doc(doc.id).get().then(info => {
                    const { name, profilePicUrl } = info.data();
    
                    const friend = {
                        uid: doc.id,
                        name,
                        profilePicUrl
                    };
    
                    setViewListFriends([...viewListFriends, friend]);
                });
            });
        });
    }, [firebase, viewListFriends, setViewListFriends, viewId]);
    
    return (
        <div className='view-list-friends'>
            { viewListFriends.length
                ? viewListFriends.map(friend => (
                    <div className='friend' key={friend.uid}>
                        <div className='profile-info'>
                            <div className='name'>{friend.name}</div>
                        </div>
                    </div>
                ))
                : '0 friends found'
            }
        </div>
    );
}