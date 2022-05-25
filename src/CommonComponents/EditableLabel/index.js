
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './EditableLabel.scss';

export default function EditableLabel({ className = '', initialValue, onConfirm }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    // This will be false when viewing others' lists
    const canEdit = !!onConfirm;

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

    if (!canEdit) {
        return <div className={`display-mode editable-label ${className}`}>{initialValue}</div>
    }

    return isEditing
        ? <div className={'edit-mode editable-label ' + className}>
            <TextField
                color="secondary"
                variant="outlined" 
                value={value}
                onChange={onChange} />
            <IconButton 
                className='confirm-edit-button'
                color="secondary" 
                disabled={!hasValue}
                onClick={onClickCheck}>
                <CheckCircleIcon />
            </IconButton>
        </div>
        : <div 
            className={`display-mode editable-label can-edit ${className}`}
            onClick={onClickLabel}>
            {value}
        </div>
}