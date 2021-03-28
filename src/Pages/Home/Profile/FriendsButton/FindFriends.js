import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState, useContext, memo } from 'react';
import { FirebaseContext } from "../../../../Firebase";
import AppContext from '../../../../AppContext';
import Avatar from '@material-ui/core/Avatar';

const FindFriends = memo(({ uid, addFriend }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const firebase = useContext(FirebaseContext);

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const onClickSearch = () => {
        let uppercasedName = [];
        searchValue.split(" ").forEach(word => {
            uppercasedName.push(word[0].toUpperCase() + word.substr(1));
        });
        uppercasedName = uppercasedName.join(" ");

        console.log(uppercasedName);

        firebase.firestore()
            .collection('publicUserInfo')
            .where('name', 'in', [searchValue, uppercasedName])
            .get()
            .then((querySnapshot) => {
                const newSearchResults = [];

                querySnapshot.forEach((doc) => {
                    // if (doc.id === uid) { return } // TODO uncomment

                    const { name, profilePicUrl } = doc.data();

                    newSearchResults.push({
                        uid: doc.id,
                        name,
                        profilePicUrl
                    });
                });

                console.log(newSearchResults);
                setSearchResults(newSearchResults);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    return (
        <div className='find-friends'>
            <div className='instructions'>Search for friends by their full name</div>
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
                <div className='num-results'>{searchResults.length} result found</div>
            }
            <div className='search-results'>
                {searchResults && searchResults.map(user => (
                    <div key={user.uid} className='result'>
                        <div className='profile-info'>
                            <Avatar className='profile-pic' src={user.profilePicUrl} alt='Profile pic' />
                            <div className='name'>{user.name}</div>
                        </div>
                        <Button className='add-button' onClick={() => addFriend(user.uid)}>
                            Add friend
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default function ConnectedFindFriends() {
    const { state, actions } = useContext(AppContext);
    const { user } = state;
    const { uid } = user;
    const { addFriend } = actions;

    return (
        <FindFriends uid={uid} addFriend={addFriend} />
    );
}