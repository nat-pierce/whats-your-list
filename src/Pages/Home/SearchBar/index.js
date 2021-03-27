/* eslint-disable */
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState, useEffect, useCallback, memo } from 'react';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash.debounce';
import { searchMovieApi } from '../../../ApiUtilities';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import './SearchBar.scss';

const SearchBar = memo(({ addMovieToList }) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [reactKey, setReactKey] = useState(0);

    const onChooseMovie = (e, value) => {
        addMovieToList(value);
        setReactKey(reactKey+1);
        setInputValue('');
        setOptions([]);
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

    const renderOption = ({ Title, Year, Poster }) => {
        return (
            <div className='search-option'>
                {(Poster !== "N/A") && <img className='poster' src={Poster} />}
                <div>{`${Title} (${Year})`}</div>
            </div>
        )
    };

    return (
        <Autocomplete 
            key={reactKey}
            className='search'
            multiple={false}
            options={options}
            onChange={onChooseMovie}
            onInputChange={onInputChange}
            loading={(options.length === 0) && (inputValue !== '')}
            noOptionsText={'Search for your favorite movies by title'}
            // disable filtering on client side
            filterOptions={(option) => option}
            getOptionLabel={({ Title, Year }) => `${Title} (${Year})`}
            renderOption={renderOption}
            renderInput={(params) => <TextField {...params} label="Search" color="secondary" variant="outlined" />}
        />
    );
});

export default function ConnectedSearchBar() {
    const { actions } = useContext(AppContext);
    const { addMovieToList } = actions;

    return <SearchBar addMovieToList={addMovieToList} />;
}