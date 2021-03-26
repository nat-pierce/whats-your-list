export const searchMovieApi = (title, callback) => {
    if (!title || !callback) {
        return [];
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
        if (!data.Error) {
            callback(data.Search)
        }
    })
    .catch(err => {
        console.error(err);
    });
}