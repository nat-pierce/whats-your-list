/* eslint-disable */
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState, useEffect, useCallback, memo, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash.debounce';
import { searchMovieApi } from '../../../ApiUtilities';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import './SearchBar.scss';
import { MAX_NUM_MOVIES } from '../../../Constants';

const SearchBar = memo(({ addMovieToList, favoriteMovies }) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [reactKey, setReactKey] = useState(0);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);
    const existingIds = favoriteMovies.map(m => m.imdbID);

    const maxNum = MAX_NUM_MOVIES;
    const isDisabled = favoriteMovies.length >= maxNum;

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
            if (results) {
                setError(null);
                setOptions(results);
            } else {
                setError('Unable to find results');
                setOptions([]);
            }
        });
    }, [inputValue, getOptionsDelayed]);

    const renderOption = ({ Title, Year, Poster, imdbID }) => {
        const existingRank = existingIds.findIndex(id => id === imdbID) + 1;

        return (
            <div className='search-option'>
                {(Poster !== "N/A") && <img className='poster' src={Poster} />}
                <div className='title'>{`${Title} (${Year})`}</div>
                {existingRank > 0 && 
                    <div className='current-rank'>Current rank: {existingRank}</div>
                }
            </div>
        )
    };

    return (
        <Autocomplete 
            key={reactKey}
            className='search'
            disabled={isDisabled}
            multiple={false}
            options={options}
            onChange={onChooseMovie}
            onInputChange={onInputChange}
            loading={(options.length === 0) && (inputValue !== '') && !error}
            noOptionsText={error || 'Search for your favorite movies by title'}
            // disable filtering on client side
            filterOptions={(option) => option}
            getOptionLabel={({ Title, Year }) => `${Title} (${Year})`}
            getOptionDisabled={({ imdbID }) => existingIds.findIndex(id => id === imdbID) > -1}
            renderOption={renderOption}
            renderInput={(params) => <TextField 
                {...params} 
                autoFocus={reactKey > 0} // After a movie is chosen and this is rerendered, maintain focus to easily add more movies
                label={isDisabled ? `Max number of movies added (${maxNum})` : "Search"} 
                color="secondary" 
                variant="outlined" />
            }
        />
    );
});

export default function ConnectedSearchBar() {
    const { state, actions } = useContext(AppContext);
    const { favoriteMovies } = state;
    const { addMovieToList } = actions;

    return (
        <SearchBar 
            favoriteMovies={favoriteMovies} 
            addMovieToList={addMovieToList} 
        />
    );
}