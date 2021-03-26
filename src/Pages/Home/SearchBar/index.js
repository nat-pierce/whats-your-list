/* eslint-disable */
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState, useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash.debounce';
import { getSearchOptionsAsync } from './SearchUtilities';
import { searchMovieApi } from '../../../ApiUtilities';

export default function SearchBar() {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    
    console.log('o', options);

    const onChooseMovie = (e, value) => {
        console.log(e, value);
    };

    const getOptionSelected = (option, value) => {
        return option.imdbID === value.imdbID
    };

    const onInputChange = (e, value) => {
        setInputValue(value);
    };

    // https://stackoverflow.com/questions/40811535/delay-suggestion-time-material-ui-autocomplete-component
    const getOptionsDelayed = useCallback(
        debounce((text, callback) => {
            setOptions([]);
            searchMovieApi(text, callback);
        }, 500),
        []
    );

    useEffect(() => {
        getOptionsDelayed(inputValue, (results) => {
            setOptions(results);
        });
    }, [inputValue, getOptionsDelayed]);

    return (
        <Autocomplete 
            className='search'
            options={options}
            onChange={onChooseMovie}
            onInputChange={onInputChange}
            loading={options.length === 0}
            getOptionSelected={getOptionSelected}
            // disable filtering on client side
            filterOptions={(option) => option}
            getOptionLabel={(option) => option.Title}
            renderInput={(params) => <TextField {...params} label="Search by title" color="secondary" variant="outlined" />}
        />
    );
}