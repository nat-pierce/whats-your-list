import { memo, useEffect, useRef } from 'react';
import './FavoriteList.scss';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { usePrevious } from '../../../Utilities/Hooks';
import { smallScreenMax } from '../../../StyleExports.module.scss';
import MovieTile from '../../../CommonComponents/MovieTile';

const FavoriteList = memo(({ favoriteMovies, reorderMovieList, removeMovieFromList }) => {
    const containerRef = useRef(null);
    const previousNumMovies = usePrevious(favoriteMovies.length);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = [...favoriteMovies];
        const [reorderedItem] = items.splice(result.source.index, 1);

        items.splice(result.destination.index, 0, reorderedItem);
        const itemsWithUpdatedOrderIds = items.map((item, i) => ({ ...item, OrderId: i }));

        reorderMovieList(itemsWithUpdatedOrderIds);
    }

    useEffect(() => {
        if (favoriteMovies.length > previousNumMovies) {
            if (window.innerWidth > parseInt(smallScreenMax)) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            } else {
                containerRef.current.scrollIntoView(false);
            }
        }
    }, [favoriteMovies, previousNumMovies, containerRef])

    return (
        <div className='favorite-list' id='favorite-list' ref={containerRef}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-1">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {favoriteMovies.map((movie, i) => (
                                <Draggable key={movie.imdbID} draggableId={`draggable-${movie.imdbID}`} index={i}>
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
                                                <IconButton className='remove-icon' onClick={() => removeMovieFromList(movie.imdbID, i)}>
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
            </DragDropContext>      
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