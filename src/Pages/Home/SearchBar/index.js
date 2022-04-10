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
import Guide from '../../../CommonComponents/Guide';

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
        addMovieToList(value, "Search");
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
                    <div className='current-rank'>Already #{existingRank}</div>
                }
            </div>
        )
    };

    const loading = (options.length === 0) && (inputValue !== '') && !error

    const filterOptions = (options) => {
        return options.filter(o => o.Poster !== 'N/A');
    }

    const getOptionLabel = ({ Title, Year }) => {
        return `${Title} (${Year})`;
    }

    const getOptionDisabled = ({ imdbID }) => {
        return existingIds.findIndex(id => id === imdbID) > -1;
    }

    const renderInput = (params) => {
        const label = isDisabled 
            ? `Max movies added (${maxNum})` 
            : "Search movies";

        return (
            <TextField 
                {...params} 
                autoFocus={reactKey > 0} // After a movie is chosen and this is rerendered, maintain focus to easily add more movies
                label={label} 
                color="secondary" 
                variant="outlined" />
        );
    }

    return (
        <>
            <Autocomplete 
                key={reactKey}
                className='search'
                disabled={isDisabled}
                multiple={false}
                options={options}
                onChange={onChooseMovie}
                onInputChange={onInputChange}
                loading={loading}
                noOptionsText={error || 'Search for your favorite movies by title'}
                filterOptions={filterOptions}
                getOptionLabel={getOptionLabel}
                getOptionDisabled={getOptionDisabled}
                renderOption={renderOption}
                renderInput={renderInput}
            />
            {favoriteMovies.length === 0 && <Guide />}
        </>
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