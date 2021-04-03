import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { memo, useContext } from "react";
import AppContext from "../../../AppContext";
import './ViewListFavoriteMovies.scss';
import { MAX_NUM_MOVIES } from "../../../Constants";

const ViewListFavoriteMovies = memo(({ isSignedIn, viewListMovies, favoriteMovies, addMovieToList }) => {
    const atMaxMovies = favoriteMovies.length >= MAX_NUM_MOVIES;

    const addButton = (movie) => {
        return atMaxMovies
            ? <Tooltip title={`Max movies already added (${MAX_NUM_MOVIES})`}>
                <span className='add-button'>
                    <Button disabled={true}>
                        Add
                    </Button>
                </span>
            </Tooltip>
            : <Button 
                className='add-button' 
                onClick={() => addMovieToList(movie, "View list")}>
                Add
            </Button>;
    };
    
    return (
        <div className='favorite-list view-list-favorite-movies'>
            {viewListMovies && viewListMovies.map((movie, i) => {
                const myRank = favoriteMovies.findIndex(m => m.imdbID === movie.imdbID) + 1;

                return (
                    <div className='tile' key={movie.imdbID}>
                        <div className='rank'>#{i+1}</div>
                        {movie.Poster !== 'N/A' && 
                            <img 
                                className='poster' 
                                src={movie.Poster} 
                                alt='Movie poster' />
                        }
                        <div>{movie.Title} ({movie.Year})</div>
                        {isSignedIn && myRank > 0 &&
                            <div className='my-rank'>My #{myRank}</div>
                        }
                        {isSignedIn && myRank <= 0 &&
                            addButton(movie)
                        }
                    </div>
                );
            })}
        </div>
    );
});

export default function ConnectedViewListFavoriteMovies(props) {
    const { state, actions } = useContext(AppContext);

    const isSignedIn = !!state.user;

    const favoriteMovies = isSignedIn
        ? state.favoriteMovies
        : [];

    const { addMovieToList } = actions;

    return (
        <ViewListFavoriteMovies 
            {...props} 
            isSignedIn={isSignedIn}
            favoriteMovies={favoriteMovies} 
            addMovieToList={addMovieToList} />
    );
}