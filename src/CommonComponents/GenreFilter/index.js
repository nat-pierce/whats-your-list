import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ALL_GENRES_FILTER } from '../../Constants';

export default function GenreFilter({ value, onChange, movieList }) {
    const uniqueGenres = new Set(movieList.map(m => m.Genres).flat());
    const sortedGenres = [...uniqueGenres].sort();

    return (
        <Select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            label="Genre"
        >
            <MenuItem value={ALL_GENRES_FILTER}>All</MenuItem>
            {sortedGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
            ))}
        </Select>
    );
}