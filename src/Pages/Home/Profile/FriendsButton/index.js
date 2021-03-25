import Button from '@material-ui/core/Button';

export default function FriendsButton() {
    const numFriends = 0;

    let buttonText;
    if (numFriends === 0) {
        buttonText = "Add friends";
    } else if (numFriends === 1) {
        buttonText = "1 friend";
    } else {
        buttonText = `${numFriends} friends`;
    }

    return (
        <Button className='friends-button'>
            {buttonText}
        </Button>
    );
}