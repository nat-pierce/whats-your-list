import { memo } from 'react';
import './FavoriteList.scss';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import AppContext from '../../../AppContext';

const FavoriteList = memo(({ favoriteMovies, reorderMovieList }) => {
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

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-1">
                {(provided, snapshot) => (
                    <div
                        className='favorite-list'
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {favoriteMovies.map((movie, i) => (
                            <Draggable key={movie.imdbID} draggableId={`draggable-${movie.imdbID}`} index={i}>
                                {(provided, snapshot) => (
                                    <div
                                        className='tile'
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <div className='rank'>{i+1}</div>
                                        {movie.Poster !== 'N/A' && 
                                            <img 
                                                className='poster' 
                                                src={movie.Poster} 
                                                alt='Movie poster' />
                                        }
                                        <div>{movie.Title} ({movie.Year})</div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
});

export default function ConnectedFavoriteList() {
    const { state, actions } = useContext(AppContext);
    const { favoriteMovies } = state;
    const { reorderMovieList } = actions;

    return (
        <FavoriteList 
            favoriteMovies={favoriteMovies} 
            reorderMovieList={reorderMovieList} />
    );
}