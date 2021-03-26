import { memo, useContext } from "react";
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppContext from "../../AppContext";

const Settings = memo(({ signOut }) => {
    const history = useHistory();
    
    const onSignOut = () => {
        signOut(history);
    };

    return (
        <div className='settings-page'>
            <Button color="primary" variant="contained" onClick={onSignOut}>
                Sign Out
            </Button>
        </div>
    );
});

export default function ConnectedSettings() {
    const { actions } = useContext(AppContext);
    const { signOut } = actions;

    return <Settings signOut={signOut} />;
}