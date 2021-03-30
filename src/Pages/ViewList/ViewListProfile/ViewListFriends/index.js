import { useEffect, useContext } from 'react';
import { FirebaseContext } from '../../../../Firebase';
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { getFriendsInfo } from '../../../../FirebaseFunctions';

export default function ViewListFriends({ viewId }) {
    const firebase = useContext(FirebaseContext);
    const [viewListFriends, setViewListFriends] = useState([]);

    useEffect(() => {
        if (viewListFriends.length) { return };

        getFriendsInfo(viewId).then(({ result }) => {
            setViewListFriends(result);
        })
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