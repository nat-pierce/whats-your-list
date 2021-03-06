import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState, useContext, memo } from 'react';
import { FirebaseContext } from "../../../Firebase";
import AppContext from '../../../AppContext';
import Avatar from '@material-ui/core/Avatar';
import './FindFriends.scss';
import { useKeypress } from '../../../Utilities/Hooks';

const FindFriends = memo(({ uid, addFriend, friends }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [sentRequests, setSentRequests] = useState([]);
    const firebase = useContext(FirebaseContext);
    const friendIds = friends.map(f => f.uid);

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const onClickSearch = async () => {
        const newSearchResults = [];
        let querySnapshotDocs;

        if (searchValue.indexOf(" ") > -1) {
            let uppercasedName = [];
            searchValue.split(" ").forEach(word => {
                uppercasedName.push(word[0].toUpperCase() + word.substr(1));
            });
            uppercasedName = uppercasedName.join(" ");

            querySnapshotDocs = await firebase.firestore()
                .collection('publicUserInfo')
                .where('name', "in", [searchValue, uppercasedName])
                .get();
        } else {
            let uppercasedName = searchValue[0].toUpperCase() + searchValue.substr(1);
            
            const firstNameQuerySnapshot = await firebase.firestore()
                .collection('publicUserInfo')
                .where('firstName', "in", [searchValue, uppercasedName])
                .get();

            const lastNameQuerySnapshot = await firebase.firestore()
                .collection('publicUserInfo')
                .where('lastName', "in", [searchValue, uppercasedName])
                .get();

            querySnapshotDocs = [...firstNameQuerySnapshot.docs, ...lastNameQuerySnapshot.docs];
        }

        querySnapshotDocs.forEach((doc) => {
            if (doc.id === uid || friendIds.includes(doc.id)) { return }

            const { name, profilePicUrl } = doc.data();

            newSearchResults.push({
                uid: doc.id,
                name,
                profilePicUrl
            });
        });

        setSearchResults(newSearchResults);
    }

    const onClickAddFriend = (id) => {
        setSentRequests([...sentRequests, id]);
        addFriend(id, "Find friends");
    }

    useKeypress('Enter', onClickSearch);

    return (
        <div className='find-friends'>
            <div className='instructions'>Find new friends using their first or last name</div>
            <div className='upper'>
                <TextField 
                    className='search-box'
                    value={searchValue}
                    onChange={onChangeSearch}
                    variant="outlined"
                    color="secondary"
                />
                <Button variant='contained' color='secondary' onClick={onClickSearch}>
                    Search
                </Button>
            </div>
            {searchResults && searchResults.length === 1 && 
                <div className='num-results'>1 result found</div>
            }
            {searchResults && searchResults.length !== 1 &&
                <div className='num-results'>{searchResults.length} results found</div>
            }
            <div className='search-results'>
                {searchResults && searchResults.map(user => (
                    <div key={user.uid} className='result'>
                        <div className='profile-info'>
                            <Avatar className='profile-pic' src={user.profilePicUrl} alt='Profile pic' />
                            <div className='name'>{user.name}</div>
                        </div>
                        {sentRequests.includes(user.uid)
                            ? <div className='sent-message'>Request sent</div>
                            : (
                                <Button className='add-button' onClick={() => onClickAddFriend(user.uid)}>
                                    Send friend request
                                </Button>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    );
});

export default function ConnectedFindFriends() {
    const { state, actions } = useContext(AppContext);
    const { user, friends } = state;
    const { uid } = user;
    const { addFriend } = actions;

    return (
        <FindFriends uid={uid} addFriend={addFriend} friends={friends} />
    );
}