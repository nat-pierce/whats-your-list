import React, { memo, useContext, useRef, useState, useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import AppContext from '../../AppContext';
import { HOME_TABS, MAX_NUM_MOVIES, ALL_GENRES_FILTER } from '../../Constants';
import { useScrollToBottom } from '../../Utilities/Hooks';
import MovieTile from '../../CommonComponents/MovieTile';
import CustomMenu from '../../CommonComponents/CustomMenu';
import GenreFilter from '../../CommonComponents/GenreFilter';

const WatchLater = memo(({ 
    watchLaterMovies, 
    canMoveToFavorites,
    reorderMovieList, 
    removeMovieFromList,
    addMovieToList 
}) => {
    const containerRef = useRef(null);
    const [genreFilter, setGenreFilter] = useState(ALL_GENRES_FILTER);
    
    useEffect(() => {
        console.log('mounted')

        return () => {
            console.log('unmounted')
        }
    })
    
    useScrollToBottom(watchLaterMovies, containerRef);

    // TODO handle drag when filtering genre

    const menuOptions = [
        { 
            label: 'Add to favorites', 
            onClick: (movie, index) => {
                removeMovieFromList(movie.imdbID, index, HOME_TABS.WatchLater)
                addMovieToList(movie, HOME_TABS.Favorites, 'Watch later');
            }, 
            isDisabled: !canMoveToFavorites
        },
        { 
            label: 'Remove', 
            onClick: (movie, index) => {
                removeMovieFromList(movie.imdbID, index, HOME_TABS.WatchLater)
            }
        }
    ];

    const getClassName = (movie) => {
        if (genreFilter === ALL_GENRES_FILTER) {
            return '';
        }

        if (movie.Genres.includes(genreFilter)) {
            return 'visible-genre';
        }

        return 'hidden-genre';
    }

    return (
        <div className='movie-list watch-later-list' id='watch-later-list' ref={containerRef}>
            <GenreFilter 
                value={genreFilter} 
                onChange={(g) => {
                    console.log('g', g);
                    setGenreFilter(g)
                }}
                movieList={watchLaterMovies} 
            />
            <Droppable droppableId={HOME_TABS.WatchLater}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {watchLaterMovies.map((movie, index) => (
                            <Draggable 
                                key={movie.imdbID} 
                                draggableId={`draggable-watch-later-${movie.imdbID}`} 
                                index={index}
                                className={getClassName(movie)}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        className='tile-wrapper'
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <MovieTile 
                                            key={movie.imdbID}
                                            dragHandleProps={provided.dragHandleProps}
                                            movie={movie}
                                        >
                                            <CustomMenu 
                                                menuOptions={menuOptions}
                                                movie={movie}
                                                index={index} 
                                            />
                                        </MovieTile>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable> 
        </div>         
    );
});

export default function ConnectedWatchLater() {
    const { state, actions } = useContext(AppContext);
    const { watchLaterMovies, favoriteMovies } = state;
    const { reorderMovieList, removeMovieFromList, addMovieToList } = actions;

    const canMoveToFavorites = favoriteMovies.length < MAX_NUM_MOVIES;

    return (
        <WatchLater 
            watchLaterMovies={watchLaterMovies} 
            canMoveToFavorites={canMoveToFavorites}
            reorderMovieList={reorderMovieList}
            removeMovieFromList={removeMovieFromList} 
            addMovieToList={addMovieToList}
        />
    );
}