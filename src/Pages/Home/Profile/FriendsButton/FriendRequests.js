import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState, useContext, memo, useEffect } from 'react';
import { FirebaseContext } from "../../../../Firebase";
import AppContext from '../../../../AppContext';
import Avatar from '@material-ui/core/Avatar';

const FriendRequests = memo(({ uid, friendRequests, acceptRequest }) => {
    return (
        <div className='friend-requests'>
            {friendRequests.map(request => (
                <div className='request'>

                </div>
            ))}
        </div>
    );
});

export default function ConnectedFriendRequests() {
    const { state, actions } = useContext(AppContext);
    const { user, friendRequests } = state;
    const { uid } = user;
    const { acceptRequest } = actions;

    return (
        <FriendRequests uid={uid} friendRequests={friendRequests} acceptRequest={acceptRequest} />
    );
}