import TextField from '@material-ui/core/TextField';

export default function TextInput({ className = '', label, value, onChange }) {
    return (
        <TextField 
            className={className}
            label={label}
            variant="outlined" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}