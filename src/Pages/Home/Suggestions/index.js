import './Suggestions.scss';
import { memo, useContext, useState, useEffect } from 'react';
import AppContext from '../../../AppContext';
import { getSimilarMoviesApi } from '../../../ApiUtilities';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { smallScreenMax, mediumScreenMax } from '../../../StyleExports.module.scss';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

const Suggestions = memo(({ favoriteMovies, suggestedMovies, setSuggestedMovies, addMovieToList }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [numTries, setNumTries] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoading) { return }

        if (numTries > 2) {
            setError('Unable to load suggestions');
            return;
        }

        if (suggestedMovies.length === 0 && favoriteMovies.length !== 0) {
            setIsLoading(true);

            // get similar to random movie
            const randomIndex = getRandomInt(0, favoriteMovies.length);
            const { imdbID } = favoriteMovies[randomIndex];

            console.log('fetching movies for:', favoriteMovies[randomIndex]);

            getSimilarMoviesApi(imdbID).then(result => {
                console.log('r', result);
                if (result && result.movie_results && result.results !== 0) {
                    const ids = result.movie_results.filter(m => {
                        const alreadyAdded = favoriteMovies.findIndex(m => m.imdbID === m.imdb_id) > -1;
                        const alreadyReleased = Date.parse(m.release_date) < new Date().getTime();

                        return alreadyReleased && !alreadyAdded;
                    }).map(m => m.imdb_id);

                    if (ids.length) {
                        setSuggestedMovies(ids);
                        setNumTries(0);
                    } else {
                        // if request didn't work, run it again with a new random movie
                        setNumTries(numTries + 1);
                        setIsLoading(false);
                    }
                } else {
                    // if request didn't work, run it again with a new random movie
                    setNumTries(numTries + 1);
                    setIsLoading(false);
                }
            });
        }
    }, [suggestedMovies, setIsLoading, setSuggestedMovies, favoriteMovies, isLoading, setNumTries, numTries, setError]);

    useEffect(() => {
        if (suggestedMovies.length) {
            setIsLoading(false);
        }
    }, [setIsLoading, suggestedMovies]);

    if (isLoading) {
        return <div className='suggestions'>
            <h1 className='section-title'>Suggested</h1>
            <div className='suggestions-overlay'>
                <CircularProgress color="secondary" />
            </div>
        </div>;
    }

    if (error) {
        return <div className='suggestions'>
            <h1 className='section-title'>Suggested</h1>
            <div className='suggestions-overlay'>{error}</div>
        </div>
    }

    const responsive = {
        largeScreen: {
            breakpoint: { max: 3000, min: parseInt(mediumScreenMax) },
            items: 4
        },
        mediumScreen: {
            breakpoint: { max: parseInt(mediumScreenMax), min: parseInt(smallScreenMax) },
            items: 3
        }
    };

    return (
        <div className='suggestions'>
            <h1 className='section-title'>Suggested</h1>
            <Carousel className='carousel' responsive={responsive} infinite={true}>
                {suggestedMovies.map(movie => !!movie && (
                    <div className="suggestion" key={movie.imdbID} onClick={() => addMovieToList(movie)}>
                        <img 
                            className='poster' 
                            src={movie.Poster} 
                            alt='Movie poster' />
                        <div className='hover-overlay'>
                            <AddCircleIcon className='add-icon' />
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export default function ConnectedSuggestions() {
    const { state, actions } = useContext(AppContext);
    const { suggestedMovies, favoriteMovies } = state;
    const { setSuggestedMovies, addMovieToList } = actions;

    return <Suggestions 
        favoriteMovies={favoriteMovies} 
        suggestedMovies={suggestedMovies} 
        setSuggestedMovies={setSuggestedMovies} 
        addMovieToList={addMovieToList} />;
}