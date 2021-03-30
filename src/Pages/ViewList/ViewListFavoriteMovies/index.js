import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { memo, useContext } from "react";
import AppContext from "../../../AppContext";
import './ViewListFavoriteMovies.scss';
import { MAX_NUM_MOVIES } from "../../../Constants";

const ViewListFavoriteMovies = memo(({ viewListMovies, favoriteMovies, addMovieToList }) => {
    const canAddMovies = favoriteMovies.length < MAX_NUM_MOVIES;

    const addButton = (movie) => {
        return canAddMovies
            ? <Button 
                className='add-button' 
                onClick={() => addMovieToList(movie)}>
                Add
            </Button>
            : <Tooltip title={`Max movies already added (${MAX_NUM_MOVIES})`}>
                <span className='add-button'>
                    <Button disabled={true}>
                        Add
                    </Button>
                </span>
            </Tooltip>
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
                        {myRank > 0 
                            ? <div className='my-rank'>My rank: {myRank}</div>
                            : addButton(movie)
                        }
                    </div>
                );
            })}
        </div>
    );
});

export default function ConnectedViewListFavoriteMovies(props) {
    const { state, actions } = useContext(AppContext);
    const favoriteMovies = state.user
        ? state.favoriteMovies
        : [];

    const { addMovieToList } = actions;

    return (
        <ViewListFavoriteMovies 
            {...props} 
            favoriteMovies={favoriteMovies} 
            addMovieToList={addMovieToList} />
    );
}