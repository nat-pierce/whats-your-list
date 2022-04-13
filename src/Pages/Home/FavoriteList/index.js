import { memo, useRef } from 'react';
import './FavoriteList.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import MovieTile from '../../../CommonComponents/MovieTile';
import { HOME_TABS } from '../../../Constants';
import { useScrollToBottom } from '../../../Utilities/Hooks';

const FavoriteList = memo(({ favoriteMovies, reorderMovieList, removeMovieFromList }) => {
    const containerRef = useRef(null);

    useScrollToBottom(favoriteMovies, containerRef);

    return (
        <div className='favorite-list' id='favorite-list' ref={containerRef}>
            <Droppable droppableId={HOME_TABS.Favorites}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {favoriteMovies.map((movie, i) => (
                            <Draggable key={movie.imdbID} draggableId={`draggable-favorite-${movie.imdbID}`} index={i}>
                                {(provided, snapshot) => (
                                    <div
                                        className='tile-wrapper'
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <MovieTile 
                                            key={movie.imdbID}
                                            dragHandleProps={provided.dragHandleProps}
                                            rank={i+1}
                                            movie={movie}
                                        >
                                            <IconButton className='remove-icon' onClick={() => removeMovieFromList(movie.imdbID, i, HOME_TABS.Favorites)}>
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

export default function ConnectedFavoriteList() {
    const { state, actions } = useContext(AppContext);
    const { favoriteMovies } = state;
    const { reorderMovieList, removeMovieFromList } = actions;

    return (
        <FavoriteList 
            favoriteMovies={favoriteMovies} 
            reorderMovieList={reorderMovieList}
            removeMovieFromList={removeMovieFromList} />
    );
}