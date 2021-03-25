/* eslint-disable */
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState, useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash.debounce';
import { getSearchOptionsAsync } from './SearchUtilities';

export default function SearchBar() {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    const onInputChange = (e, value) => {
        setInputValue(value);
    }

    // https://stackoverflow.com/questions/40811535/delay-suggestion-time-material-ui-autocomplete-component
    const getOptionsDelayed = useCallback(
        debounce((text, callback) => {
            setOptions([]);
            getSearchOptionsAsync(text).then(callback);
        }, 200),
        []
    );

    useEffect(() => {
        getOptionsDelayed(inputValue, (filteredOptions) => {
            setOptions(filteredOptions);
        });
    }, [inputValue, getOptionsDelayed]);

    return (
        <Autocomplete 
            className='search'
            options={options}
            onInputChange={onInputChange}
            loading={options.length === 0}
            // disable filtering on client side
            filterOptions={(option) => option}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Search" color="secondary" variant="outlined" />}
        />
    );
}