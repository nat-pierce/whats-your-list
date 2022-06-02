import { API_HOST_URL } from '../Constants';

export const searchMovieApi = (search, callback) => {
    if (!search) {
        return callback([]);
    }

    // regex to grab movie title, and also optional year included at end with optional parentheses
    const searchTerms = search.split(" ");
    const lastTerm = searchTerms.pop();
    const yearMatches = lastTerm.match(/^\(?(19|20)\d{2}\)?$/g);
    
    let title, year;
    if (yearMatches && yearMatches.length === 1) {
        title = searchTerms.join(" "); // Now that year is popped off of array, join remaining items into movie title
        year = yearMatches[0].replace("(", "").replace(")", ""); // Grab the year, trimming off any parentheses if needed
    } else {
        title = search;
    }

    const encodedTitle = encodeURIComponent(title.trim());
    const url = `https://${API_HOST_URL}/?s=${encodedTitle}&page=1&r=json&type=movie${year ? '&y=' + year : ''}`;

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.REACT_APP_MOVIE_API_KEY,
            "x-rapidapi-host": API_HOST_URL
        }
    })
    .then(response => response.json())
    .then(data => {
        const listToReturn = data && !data.Error && data.Search.filter(m => m.Poster !== 'N/A');

        if (listToReturn && (listToReturn.length > 0)) {
            callback(listToReturn)
        } else if (data.Error === 'Too many results.') {
            getMovieByTitle(encodedTitle, year, callback);
        } else {
            callback(null);
        }
    })
    .catch(err => {
        console.error(err);
    });
}

const getMovieByTitle = (encodedTitle, year, callback) => {
    const url = `https://${API_HOST_URL}/?t=${encodedTitle}&r=json&type=movie${year ? '&y=' + year : ''}`; // using parameter t instead of s

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.REACT_APP_MOVIE_API_KEY,
            "x-rapidapi-host": API_HOST_URL
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && (data.Poster !== 'N/A') && !data.Error) {
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