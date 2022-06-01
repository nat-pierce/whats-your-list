import React, { memo, useContext, useState } from 'react';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import './MovieTile.scss';
import AppContext from '../../AppContext';
import { getIsOnline } from '../../Utilities/EnvironmentUtilities';

const MovieTile = memo(({
    dragHandleProps,
    rank,
    movie,
    tabType,
    replaceMoviePoster,
    isOnline,
    children
}) => {
    const [hasAttemptedReplace, setHasAttemptedReplace] = useState(false);

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

    const titleClassName = movie.Title.length > 40
        ? 'long'
        : '';

    const onErrorPoster = () => {
        if (hasAttemptedReplace || !tabType) { return }

        setHasAttemptedReplace(true);
        replaceMoviePoster(movie, tabType);
    }

    return (
        <div className={classNames.join(' ')}>
            <div className='left-content'>
                {dragHandleProps
                    ? ( 
                        <div className={`drag-handle ${isOnline ? '' : 'hidden'}`} {...dragHandleProps}>
                            <DragHandleIcon />
                            {rankDisplay}
                        </div>
                    )
                    : rankDisplay
                }
            </div>
            <img 
                className='poster' 
                src={movie.Poster} 
                alt={hasAttemptedReplace 
                    ? 'Try removing this movie and adding it again'
                    : '...'
                } 
                onError={onErrorPoster}
            />
            <div className={`title ${titleClassName}`}>{movie.Title} ({movie.Year})</div>
            {children}
        </div>
    );
});

export default function ConnectedMovieTile(props) {
    const { actions } = useContext(AppContext);
    const { replaceMoviePoster } = actions;
    const isOnline = getIsOnline();

    return (
        <MovieTile
            {...props}
            replaceMoviePoster={replaceMoviePoster}
            isOnline={isOnline}
        />
    );
}