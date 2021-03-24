import { useState } from 'react';
import './FavoriteList.scss';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import SearchBar from './SearchBar';

export default function FavoriteList() {
    const [favorites, setFavorites] = useState([
        { id: 17, name: 'Avengers: Endgame', year: 2019 },
        { id: 20, name: 'Minority Report', year: 2003 }
    ]);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = [...favorites];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFavorites(items);
    }

    return (
        <div className='favorite-list-wrapper'>
            <SearchBar />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-1">
                    {(provided, snapshot) => (
                        <div
                            className='favorite-list'
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {favorites.map((movie, i) => (
                                <Draggable key={movie.id} draggableId={`draggable-${movie.id}`} index={i}>
                                    {(provided, snapshot) => (
                                        <div
                                            className='tile'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <div>Rank: {i+1}</div>
                                            <div>{movie.name} ({movie.year})</div>
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
}