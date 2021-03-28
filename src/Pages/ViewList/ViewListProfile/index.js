import Avatar from '@material-ui/core/Avatar';

export default function ViewListProfile({ profilePicUrl, name }) {
    return (
        <div className='view-list-profile'>
            <Avatar className='profile-pic' src={profilePicUrl} alt='Profile pic' />
        </div>
    );
}