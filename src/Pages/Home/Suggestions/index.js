import './Suggestions.scss';
import { memo, useContext, useState, useEffect } from 'react';
import AppContext from '../../../AppContext';
import { getPopularMoviesApi } from '../../../ApiUtilities';

const Suggestions = memo(({ favoriteMovies, suggestedMovies, setSuggestedMovies }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (suggestedMovies.length === 0) {
            setIsLoading(true);

            getPopularMoviesApi().then(result => {
                if (result) {
                    const ids = result.movie_results.map(m => m.imdb_id);

                    setSuggestedMovies(ids);
                }
            })
            // if (favoriteMovies.length === 0) {
            //     // get popular
            // } else {
            //     // get similar to random movie
            // }
        } else {
            setIsLoading(false);
        }
    }, [suggestedMovies, setIsLoading, setSuggestedMovies])

    if (isLoading) {
        return <div>Loading</div> // TODO material spinner
    }

    return (
        <div className='suggestions'>
            {suggestedMovies.map(movie => (
                <div key={movie.imdbID}>
                    
                </div>
            ))}
        </div>
    );
});

export default function ConnectedSuggestions() {
    const { state, actions } = useContext(AppContext);
    const { suggestedMovies, favoriteMovies } = state;
    const { setSuggestedMovies } = actions;

    return <Suggestions favoriteMovies={favoriteMovies} suggestedMovies={suggestedMovies} setSuggestedMovies={setSuggestedMovies} />;
}