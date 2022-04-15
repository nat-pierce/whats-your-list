import React from 'react';
import { FavoriteListIcon, WatchLaterListIcon } from '../Icons';
import './Chip.scss';

export default function Chip({
    favoriteMovieIds,
    watchLaterMovieIds,
    imdbID
}) {
    const existingFavoriteRank = favoriteMovieIds.findIndex(id => id === imdbID) + 1;
    const isAlreadySavedForLater = watchLaterMovieIds.some(id => id === imdbID);

    if (existingFavoriteRank > 0) {
        return (
            <div className='chip'>
                {FavoriteListIcon} Already #{existingFavoriteRank}
            </div>
        );
    } 

    if (isAlreadySavedForLater) {
        return (
            <div className='chip'>
                {WatchLaterListIcon} Already saved
            </div>
        );
    }

    return null;
}