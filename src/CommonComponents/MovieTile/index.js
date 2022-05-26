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
    const isTopTen = rank <= 10;
    const isSingleDigit = rank <= 9;
    const isDoubleDigit = rank >= 10 && rank <= 99;
    const isTripleDigit = rank >= 100;

    const classNames = [
        'movie-tile',
        isTopTen ? 'top-ten' : '',
        isSingleDigit ? 'single' : '',
        isDoubleDigit ? 'double' : '',
        isTripleDigit ? 'triple' : ''
    ];

    return (
        <div className={classNames.join(' ')}>
            <div className='left-content'>
                {dragHandleProps 
                    ? ( 
                        <div className='drag-handle'{...dragHandleProps}>
                            <DragHandleIcon />
                            {rankDisplay}
                        </div>
                    )
                    : rankDisplay
                }
            </div>
            <img className='poster' src={movie.Poster} alt='Movie poster' />
            <div className='title'>{movie.Title} ({movie.Year})</div>
            {children}
        </div>
    );
}