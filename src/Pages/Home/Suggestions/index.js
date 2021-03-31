import './Suggestions.scss';
import { memo, useContext, useState, useEffect } from 'react';
import AppContext from '../../../AppContext';
import { getSimilarMoviesApi } from '../../../ApiUtilities';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { smallScreenMax, mediumScreenMax } from '../../../StyleExports.module.scss';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
        return <div className='suggestions'>Loading</div> // TODO material spinner
    }

    const responsive = {
        largeScreen: {
            breakpoint: { max: 3000, min: parseInt(mediumScreenMax) },
            items: 5
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
                    <div className="suggestion" key={movie.imdbID}>
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
    const { setSuggestedMovies } = actions;

    return <Suggestions favoriteMovies={favoriteMovies} suggestedMovies={suggestedMovies} setSuggestedMovies={setSuggestedMovies} />;
}