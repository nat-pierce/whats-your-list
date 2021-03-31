import './Suggestions.scss';
import { memo, useContext, useState, useEffect } from 'react';
import AppContext from '../../../AppContext';
import { getSimilarMoviesApi } from '../../../ApiUtilities';

const Suggestions = memo(({ favoriteMovies, suggestedMovies, setSuggestedMovies }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (suggestedMovies.length === 0 && favoriteMovies.length !== 0) {
            setIsLoading(true);

            // get similar to random movie
            const randomIndex = getRandomInt(0, favoriteMovies.length);
            const { imdbID } = favoriteMovies[randomIndex];

            getSimilarMoviesApi(imdbID).then(result => {
                if (result) {
                    const ids = result.movie_results.map(m => m.imdb_id);
                    const filteredIds = ids.filter(id => favoriteMovies.findIndex(m => m.imdbID === id) === -1);

                    setSuggestedMovies(filteredIds);
                }
            });
        } else {
            setIsLoading(false);
        }
    }, [suggestedMovies, setIsLoading, setSuggestedMovies, favoriteMovies]);

    if (isLoading) {
        return <div>Loading</div> // TODO material spinner
    }

    return (
        <div className='suggestions'>
            {suggestedMovies.map(movie => (
                <div key={movie.imdbID}>
                    {movie.Poster !== 'N/A' &&
                        <img 
                            className='poster' 
                            src={movie.Poster} 
                            alt='Movie poster' />
                    }
                </div>
            ))}
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
    const { setSuggestedMovies } = actions;

    return <Suggestions favoriteMovies={favoriteMovies} suggestedMovies={suggestedMovies} setSuggestedMovies={setSuggestedMovies} />;
}