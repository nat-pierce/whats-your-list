export const searchMovieApi = (title, callback) => {
    if (!title) {
        return callback([]);
    }

    const encodedTitle = encodeURIComponent(title);
    const url = `https://movie-database-imdb-alternative.p.rapidapi.com/?s=${encodedTitle}&page=1&r=json&type=movie`;
    
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.REACT_APP_MOVIE_API_KEY,
            "x-rapidapi-host": process.env.REACT_APP_MOVIE_API_HOST
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && !data.Error) {
            callback(data.Search)
        } else if (data.Error === 'Too many results.') {
            getMovieByTitle(title, callback);
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
    const url = `https://movie-database-imdb-alternative.p.rapidapi.com/?t=${encodedTitle}&r=json&type=movie`;

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.REACT_APP_MOVIE_API_KEY,
            "x-rapidapi-host": process.env.REACT_APP_MOVIE_API_HOST
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && !data.Error) {
            callback([data])
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

    const url = `https://movie-database-imdb-alternative.p.rapidapi.com/?i=${imdbID}&r=json&type=movie`;
    
    return fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.REACT_APP_MOVIE_API_KEY,
            "x-rapidapi-host": process.env.REACT_APP_MOVIE_API_HOST
        }
    })
    .then(response => response.json())
    .catch(err => {
        console.error(err);
    });
}