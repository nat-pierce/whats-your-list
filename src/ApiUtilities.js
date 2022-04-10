import { API_HOST_URL } from './Constants';

export const searchMovieApi = (title, callback) => {
    if (!title) {
        return callback([]);
    }

    const encodedTitle = encodeURIComponent(title);
    const url = `https://${API_HOST_URL}/?s=${encodedTitle}&page=1&r=json&type=movie`;

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.REACT_APP_MOVIE_API_KEY,
            "x-rapidapi-host": API_HOST_URL
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && !data.Error) {
            callback(data.Search)
        } else if (data.Error === 'Too many results.') {
            getMovieByTitle(title, callback);
        } else {
            callback(null);
        }
    })
    .catch(err => {
        console.error(err);
    });
}

const getMovieByTitle = (title, callback) => {
    if (!title || !callback) {
        return [];
    }

    const encodedTitle = encodeURIComponent(title);
    const url = `https://${API_HOST_URL}/?t=${encodedTitle}&r=json&type=movie`;

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.REACT_APP_MOVIE_API_KEY,
            "x-rapidapi-host": API_HOST_URL
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && !data.Error) {
            callback([data])
        } else {
            callback(null);
        }
    })
    .catch(err => {
        console.error(err);
    })
}

export const getMovieMetadataApi = (imdbID) => {
    if (!imdbID) {
        return null;
    }

    const url = `https://${API_HOST_URL}/?i=${imdbID}&r=json&type=movie`;
    
    return fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.REACT_APP_MOVIE_API_KEY,
            "x-rapidapi-host": API_HOST_URL
        }
    })
    .then(response => response.json())
    .catch(err => {
        console.error(err);
    });
}