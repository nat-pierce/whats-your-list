/* eslint-disable */
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState, useEffect, useCallback, memo } from 'react';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash.debounce';
import { searchMovieApi } from '../../../ApiUtilities';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import './SearchBar.scss';

const SearchBar = memo(({ addMovieToList, favoriteMovies }) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [reactKey, setReactKey] = useState(0);
    const existingIds = favoriteMovies.map(m => m.imdbID);

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
            multiple={false}
            options={options}
            onChange={onChooseMovie}
            onInputChange={onInputChange}
            loading={(options.length === 0) && (inputValue !== '')}
            noOptionsText={'Search for your favorite movies by title'}
            // disable filtering on client side
            filterOptions={(option) => option}
            getOptionLabel={({ Title, Year }) => `${Title} (${Year})`}
            getOptionDisabled={({ imdbID }) => existingIds.findIndex(id => id === imdbID) > -1}
            renderOption={renderOption}
            renderInput={(params) => <TextField {...params} label="Search" color="secondary" variant="outlined" />}
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