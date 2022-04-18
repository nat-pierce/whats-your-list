/* eslint-disable */
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState, useEffect, useCallback, memo, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash.debounce';
import { searchMovieApi } from '../../../Utilities/ApiUtilities';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import './SearchBar.scss';
import { HOME_TABS, MAX_NUM_MOVIES } from '../../../Constants';
import Guide from '../../../CommonComponents/Guide';
import { FavoriteListIcon, WatchLaterListIcon } from '../../../CommonComponents/Icons';
import Chip from '../../../CommonComponents/Chip';

const SearchBar = memo(({ 
    addMovieToList, 
    favoriteMovies, 
    watchLaterMovies,
    currentHomeTab,
    setIsSearchMounted 
}) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [reactKey, setReactKey] = useState(0);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);
    const favoriteMovieIds = favoriteMovies.map(m => m.imdbID);
    const watchLaterMovieIds = watchLaterMovies.map(m => m.imdbID);

    const maxNum = MAX_NUM_MOVIES;
    const isDisabled = favoriteMovies.length >= maxNum;

    const onChooseMovie = (e, value) => {
        addMovieToList(value, currentHomeTab, "Search");
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

    // Tell guide search is mounted
    useEffect(() => {
        setIsSearchMounted(true);

        return () => {
            setIsSearchMounted(false);
        }
    }, [setIsSearchMounted])

    const renderOption = ({ Title, Year, Poster, imdbID }) => {
        return (
            <div className='search-option'>
                {(Poster !== "N/A") && <img className='poster' src={Poster} />}
                <div className='title'>{`${Title} (${Year})`}</div>
                <Chip 
                    favoriteMovieIds={favoriteMovieIds}
                    watchLaterMovieIds={watchLaterMovieIds}
                    imdbID={imdbID}
                />
            </div>
        );
    };

    const loading = (options.length === 0) && (inputValue !== '') && !error

    const filterOptions = (options) => {
        return options.filter(o => o.Poster !== 'N/A');
    }

    const getOptionLabel = ({ Title, Year }) => {
        return `${Title} (${Year})`;
    }

    const getOptionDisabled = ({ imdbID }) => {
        return (favoriteMovieIds.some(id => id === imdbID))
            || (watchLaterMovieIds.some(id => id === imdbID));
    }

    const renderInput = (params) => {
        const icon = currentHomeTab === HOME_TABS.Favorites
            ? FavoriteListIcon
            : WatchLaterListIcon;

        const label = isDisabled 
            ? <span className='search-placeholder'>{icon} Max movies added ({maxNum})</span> 
            : <span className='search-placeholder'>{icon} Search movies</span>;

        return (
            <TextField 
                {...params} 
                className='search-text-field'
                autoFocus={reactKey > 0} // After a movie is chosen and this is rerendered, maintain focus to easily add more movies
                label={label} 
                color="secondary" 
                variant="outlined" />
        );
    }

    const noOptionsText = error || 'Search by title';

    return (
        <Autocomplete 
            key={reactKey}
            className='search'
            disabled={isDisabled}
            multiple={false}
            options={options}
            onChange={onChooseMovie}
            onInputChange={onInputChange}
            loading={loading}
            noOptionsText={noOptionsText}
            filterOptions={filterOptions}
            getOptionLabel={getOptionLabel}
            getOptionDisabled={getOptionDisabled}
            renderOption={renderOption}
            renderInput={renderInput}
        />
    );
});

export default function ConnectedSearchBar() {
    const { state, actions } = useContext(AppContext);
    const { favoriteMovies, watchLaterMovies, currentHomeTab } = state;
    const { addMovieToList, setIsSearchMounted } = actions;

    return (
        <SearchBar 
            favoriteMovies={favoriteMovies} 
            watchLaterMovies={watchLaterMovies}
            addMovieToList={addMovieToList} 
            currentHomeTab={currentHomeTab}
            setIsSearchMounted={setIsSearchMounted}
        />
    );
}