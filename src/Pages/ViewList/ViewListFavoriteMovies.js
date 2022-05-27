import React, { memo, useContext } from "react";
import AppContext from "../../AppContext";
import { HOME_TABS, MAX_NUM_MOVIES } from "../../Constants";
import MovieTile from "../../CommonComponents/MovieTile";
import Chip from '../../CommonComponents/Chip';
import CustomMenu from "../../CommonComponents/CustomMenu";

const ViewListFavoriteMovies = memo(({ 
    isSignedIn, 
    viewListMovies, 
    favoriteMovies, 
    watchLaterMovies,
    addMovieToList 
}) => {
    const favoriteMovieIds = favoriteMovies.map(m => m.imdbID);
    const watchLaterMovieIds = watchLaterMovies.map(m => m.imdbID);

    const getTileActionItem = (movie, index) => {
        if (!isSignedIn) { return }

        const { imdbID } = movie;

        const alreadyInFavorites = favoriteMovieIds.some(id => id === imdbID);
        const alreadySavedForLater = watchLaterMovieIds.some(id => id === imdbID);

        if (alreadyInFavorites || alreadySavedForLater) {
            return (
                <Chip 
                    favoriteMovieIds={favoriteMovieIds}
                    watchLaterMovieIds={watchLaterMovieIds}
                    imdbID={imdbID}
                />
            )
        }

        const menuOptions = [
            { 
                label: <span>Add to <b>Favorites</b></span>, 
                onClick: (movie) => {
                    addMovieToList(movie, HOME_TABS.Favorites, 'View Profile List');
                }, 
                isDisabled: favoriteMovieIds.length >= MAX_NUM_MOVIES
            },
            { 
                label: <span>Add to <b>Watch Later</b></span>, 
                onClick: (movie) => {
                    addMovieToList(movie, HOME_TABS.WatchLater, 'View Profile List');
                },
                isDisabled: watchLaterMovieIds.length >= MAX_NUM_MOVIES
            }
        ];

        return (
            <CustomMenu 
                menuOptions={menuOptions}
                menuButtonText='Add'
                movie={movie}
                index={index} 
            />
        );
    }
    
    return (
        <div className='movie-list view-list-favorite-movies'>
            {viewListMovies && viewListMovies.map((movie, i) => (
                <MovieTile key={movie.imdbID} rank={i+1} movie={movie}>
                    {getTileActionItem(movie, i)}
                </MovieTile>
            ))}
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