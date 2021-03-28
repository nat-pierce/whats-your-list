export default function ViewListFavoriteMovies({ viewListMovies }) {
    return (
        <div className='favorite-list'>
            {viewListMovies && viewListMovies.map((movie, i) => (
                <div className='tile'>
                    <div className='rank'>{i+1}</div>
                    {movie.Poster !== 'N/A' && 
                        <img 
                            className='poster' 
                            src={movie.Poster} 
                            alt='Movie poster' />
                    }
                    <div>{movie.Title} ({movie.Year})</div>
                </div>
            ))}
        </div>
    );
}