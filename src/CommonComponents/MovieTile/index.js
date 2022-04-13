import React from 'react';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import './MovieTile.scss';

export default function MovieTile({
    dragHandleProps,
    rank,
    movie,
    children
}) {
    return (
        <div className='movie-tile'>
            {dragHandleProps && 
                <div className='drag-handle'{...dragHandleProps}>
                    <DragHandleIcon />
                </div>
            }
            {rank && 
                <div className='rank'>#{rank}</div>
            }
            <img className='poster' src={movie.Poster} alt='Movie poster' />
            <div className='title'>{movie.Title} ({movie.Year})</div>
            {children}
        </div>
    );
}