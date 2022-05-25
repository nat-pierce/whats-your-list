import { memo, useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import AppContext from '../../AppContext';
import MovieTile from '../../CommonComponents/MovieTile';
import { HOME_TABS, MAX_NUM_MOVIES } from '../../Constants';
import { useScrollToBottom } from '../../Utilities/Hooks';
import CustomMenu from '../../CommonComponents/CustomMenu';

const FavoriteList = memo(({ 
    favoriteMovies, 
    reorderMovieList, 
    removeMovieFromList,
    addMovieToList,
    canMoveToWatchLater,
    isScrolledThreshold 
}) => {
    const containerRef = useRef(null);

    useScrollToBottom(isScrolledThreshold, favoriteMovies, containerRef);

    const menuOptions = [
        { 
            label: 'Save to watch later', 
            onClick: (movie, index) => {
                removeMovieFromList(movie.imdbID, index, HOME_TABS.Favorites)
                addMovieToList(movie, HOME_TABS.WatchLater, 'Favorites');
            }, 
            isDisabled: !canMoveToWatchLater
        },
        { 
            label: 'Remove', 
            onClick: (movie, index) => {
                removeMovieFromList(movie.imdbID, index, HOME_TABS.Favorites)
            }
        }
    ];

    return (
        <div className='movie-list favorite-list' id='favorite-list' ref={containerRef}>
            <Droppable droppableId={HOME_TABS.Favorites}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {favoriteMovies.map((movie, index) => (
                            <Draggable key={movie.imdbID} draggableId={`draggable-favorite-${movie.imdbID}`} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        className='tile-wrapper'
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <MovieTile 
                                            key={movie.imdbID}
                                            dragHandleProps={provided.dragHandleProps}
                                            rank={index+1}
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

export default function ConnectedFavoriteList(props) {
    const { state, actions } = useContext(AppContext);
    const { favoriteMovies, watchLaterMovies } = state;
    const { reorderMovieList, removeMovieFromList, addMovieToList } = actions;

    const canMoveToWatchLater = watchLaterMovies.length < MAX_NUM_MOVIES;

    return (
        <FavoriteList 
            {...props}
            favoriteMovies={favoriteMovies} 
            reorderMovieList={reorderMovieList}
            removeMovieFromList={removeMovieFromList} 
            addMovieToList={addMovieToList}
            canMoveToWatchLater={canMoveToWatchLater}
        />
    );
}