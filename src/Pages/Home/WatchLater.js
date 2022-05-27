import React, { memo, useContext, useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import AppContext from '../../AppContext';
import { HOME_TABS, MAX_NUM_MOVIES } from '../../Constants';
import { useScrollToBottom } from '../../Utilities/Hooks';
import MovieTile from '../../CommonComponents/MovieTile';
import CustomMenu from '../../CommonComponents/CustomMenu';

const WatchLater = memo(({ 
    watchLaterMovies, 
    canMoveToFavorites,
    reorderMovieList, 
    removeMovieFromList,
    addMovieToList,
    isScrolledThreshold
}) => {
    const containerRef = useRef(null);
    
    useScrollToBottom(isScrolledThreshold, watchLaterMovies, containerRef);

    const menuOptions = [
        { 
            label: <span>Move to <b>Favorites</b></span>, 
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

    return (
        <div className='movie-list watch-later-list' id='watch-later-list' ref={containerRef}>
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
                                            tabType={HOME_TABS.WatchLater}
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

export default function ConnectedWatchLater(props) {
    const { state, actions } = useContext(AppContext);
    const { watchLaterMovies, favoriteMovies } = state;
    const { reorderMovieList, removeMovieFromList, addMovieToList } = actions;

    const canMoveToFavorites = favoriteMovies.length < MAX_NUM_MOVIES;

    return (
        <WatchLater 
            {...props}
            watchLaterMovies={watchLaterMovies} 
            canMoveToFavorites={canMoveToFavorites}
            reorderMovieList={reorderMovieList}
            removeMovieFromList={removeMovieFromList} 
            addMovieToList={addMovieToList}
        />
    );
}