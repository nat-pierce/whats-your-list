
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './EditableLabel.scss';

export default function EditableLabel({ className = '', initialValue, onConfirm }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onClickLabel = () => {
        setIsEditing(true);
    }

    const onClickCheck = () => {
        if (value.trim() !== initialValue) {
            onConfirm(value.trim());
        }

        setIsEditing(false);
    }

    const hasValue = value && value.trim().length

    return isEditing
        ? <div className={'edit-mode editable-label ' + className}>
            <TextField
                variant="outlined" 
                value={value}
                onChange={onChange} />
            <IconButton 
                color="primary" 
                disabled={!hasValue}
                onClick={onClickCheck}>
                <CheckCircleIcon />
            </IconButton>
        </div>
        : <div 
            className={'display-mode editable-label ' + className}
            onClick={onClickLabel}>
            {value}
        </div>
}