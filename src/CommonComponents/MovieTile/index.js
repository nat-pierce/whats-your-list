import React from 'react';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import './MovieTile.scss';

export default function MovieTile({
    dragHandleProps,
    rank,
    movie,
    children
}) {
    const rankDisplay = rank && <div className='rank'>#{rank}</div>;

    return (
        <div className='movie-tile'>
            {dragHandleProps 
                ? ( 
                    <div className='drag-handle'{...dragHandleProps}>
                        <DragHandleIcon />
                        {rankDisplay}
                    </div>
                )
                : rankDisplay
            }
            <img className='poster' src={movie.Poster} alt='Movie poster' />
            <div className='title'>{movie.Title} ({movie.Year})</div>
            {children}
        </div>
    );
}