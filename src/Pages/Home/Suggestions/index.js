import './Suggestions.scss';
import { memo, useContext, useState, useEffect } from 'react';
import AppContext from '../../../AppContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { smallScreenMax, mediumScreenMax } from '../../../StyleExports.module.scss';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import { FirebaseContext } from '../../../Firebase';

const Suggestions = memo(({ favoriteMovies, friends, suggestedMovies, setSuggestedMovies, addMovieToList }) => {
    const firebase = useContext(FirebaseContext);
    const [isLoading, setIsLoading] = useState(false);
    const [numTries, setNumTries] = useState(0);
    const [error, setError] = useState(null);

    const onTryAgain = () => {
        setError(null);
        setNumTries(0);
    }

    useEffect(() => {
        if (isLoading) { return }
        if (suggestedMovies.length > 0) { return }
        
        if (friends.length === numTries) { 
            setError('No movies found');
            return 
        }

        if (numTries > 2) {
            setError('Unable to load');
            return;
        }

        setIsLoading(true);

        // Choose a random friend
        const randomIndex = getRandomInt(0, friends.length);
        const friend = friends[randomIndex];

        // Get their list
        firebase.firestore()
            .collection('publicUserInfo')
            .doc(friend.uid)
            .collection('favoriteMovies')
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size > 0) {
                    const randomDocs = querySnapshot.docs.sort(() => Math.random() - Math.random()).slice(0, 10);
                    const movies = randomDocs.map(d => d.data()).filter(m => {
                        if (m.Poster === 'N/A') {
                            return false;
                        }
            
                        return favoriteMovies.findIndex(f => {
                            return f.imdbID === m.imdbID;
                        }) === -1;
                    });

                    if (movies.length) {
                        setSuggestedMovies(movies);
                    } else {
                        setNumTries(numTries + 1);
                        setIsLoading(false);
                    }
                } else {
                    setNumTries(numTries + 1);
                    setIsLoading(false);
                }
            })
    }, [favoriteMovies, friends, setIsLoading, setSuggestedMovies, firebase, isLoading, suggestedMovies, setNumTries, setError, numTries])

    useEffect(() => {
        if (suggestedMovies.length) {
            setNumTries(0);
            setIsLoading(false);
        }
    }, [setIsLoading, suggestedMovies, setNumTries]);

    if (isLoading) {
        return <div className='suggestions'>
            <h1 className='section-title'>Friends' Favorites</h1>
            <div className='suggestions-overlay'>
                <CircularProgress color="secondary" />
            </div>
        </div>;
    }

    if (error) {
        return <div className='suggestions'>
            <h1 className='section-title'>Friends' Favorites</h1>
            <div className='suggestions-overlay'>
                {error}
                <Button className="try-again-button" variant="contained" onClick={onTryAgain}>
                    Try again
                </Button>
            </div>
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
            <h1 className='section-title'>Friends' Favorites</h1>
            <Carousel className='carousel' responsive={responsive} infinite={true}>
                {suggestedMovies.map(movie => (
                    <div className="suggestion" key={movie.imdbID} onClick={() => addMovieToList(movie, "Suggested")}>
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
    const { suggestedMovies, friends, favoriteMovies } = state;
    const { setSuggestedMovies, addMovieToList } = actions;

    return <Suggestions 
        friends={friends} 
        favoriteMovies={favoriteMovies}
        suggestedMovies={suggestedMovies} 
        setSuggestedMovies={setSuggestedMovies} 
        addMovieToList={addMovieToList} />;
}