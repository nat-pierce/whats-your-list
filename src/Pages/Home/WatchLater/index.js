import React, { memo, useContext, useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import AppContext from '../../../AppContext';
import { HOME_TABS } from '../../../Constants';
import { useScrollToBottom } from '../../../Utilities/Hooks';
import MovieTile from '../../../CommonComponents/MovieTile';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const WatchLater = memo(({ watchLaterMovies, reorderMovieList, removeMovieFromList }) => {
    const containerRef = useRef(null);
    
    useScrollToBottom(watchLaterMovies, containerRef);

    // TODO handle drag when filtering genre

    return (
        <div className='watch-later-list' id='watch-later-list' ref={containerRef}>
            <Droppable droppableId={HOME_TABS.WatchLater}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {watchLaterMovies.map((movie, i) => (
                            <Draggable key={movie.imdbID} draggableId={`draggable-watch-later-${movie.imdbID}`} index={i}>
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
                                            <IconButton className='remove-icon' onClick={() => removeMovieFromList(movie.imdbID, i, HOME_TABS.WatchLater)}>
                                                <RemoveCircleIcon />
                                            </IconButton>
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
    const { watchLaterMovies } = state;
    const { reorderMovieList, removeMovieFromList } = actions;

    return (
        <WatchLater 
            watchLaterMovies={watchLaterMovies} 
            reorderMovieList={reorderMovieList}
            removeMovieFromList={removeMovieFromList} />
    );
}