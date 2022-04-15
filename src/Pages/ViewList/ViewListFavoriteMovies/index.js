import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { memo, useContext } from "react";
import AppContext from "../../../AppContext";
import './ViewListFavoriteMovies.scss';
import { HOME_TABS, MAX_NUM_MOVIES } from "../../../Constants";
import MovieTile from "../../../CommonComponents/MovieTile";

const ViewListFavoriteMovies = memo(({ isSignedIn, viewListMovies, favoriteMovies, addMovieToList }) => {
    const atMaxMovies = favoriteMovies.length >= MAX_NUM_MOVIES;

    const addButton = (movie) => {
        const tabType = HOME_TABS.Favorites; // TODO

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
                onClick={() => addMovieToList(movie, tabType, "View list")}>
                Add
            </Button>;
    };

    const getTileActionItem = () => {
        if (!isSignedIn) { return }
    }
    
    return (
        <div className='view-list-favorite-movies'>
            {viewListMovies && viewListMovies.map((movie, i) => {
                const myRank = favoriteMovies.findIndex(m => m.imdbID === movie.imdbID) + 1;

                return (
                    <MovieTile key={movie.imdbID} rank={i+1} movie={movie}>
                        {isSignedIn && myRank > 0 &&
                            <div className='my-rank'>#{myRank} on my list</div>
                        }
                        {isSignedIn && myRank <= 0 &&
                            addButton(movie)
                        }
                    </MovieTile>
                );
            })}
        </div>
    );
});

export default function ConnectedViewListFavoriteMovies(props) {
    const { state, actions } = useContext(AppContext);

    const isSignedIn = !!state.user;

    let favoriteMovies = [], watchLaterMovies = [];
    if (isSignedIn) {
        favoriteMovies = state.favoriteMovies;
        watchLaterMovies = state.watchLaterMovies;
    }

    const { addMovieToList } = actions;

    return (
        <ViewListFavoriteMovies 
            {...props} 
            isSignedIn={isSignedIn}
            favoriteMovies={favoriteMovies} 
            watchLaterMovies={watchLaterMovies}
            addMovieToList={addMovieToList} 
        />
    );
}