import { memo, useContext } from "react";
import AppContext from "../../../AppContext";
import './ViewListFavoriteMovies.scss';

const ViewListFavoriteMovies = memo(({ viewListMovies, favoriteMovies }) => {
    return (
        <div className='favorite-list view-list-favorite-movies'>
            {viewListMovies && viewListMovies.map((movie, i) => {
                const myRank = favoriteMovies.findIndex(m => m.imdbID === movie.imdbID) + 1;

                return (
                    <div className='tile' key={movie.imdbID}>
                        <div className='rank'>#{i+1}</div>
                        {movie.Poster !== 'N/A' && 
                            <img 
                                className='poster' 
                                src={movie.Poster} 
                                alt='Movie poster' />
                        }
                        <div>{movie.Title} ({movie.Year})</div>
                        {myRank > 0 && <div className='my-rank'>My rank: {myRank}</div>}
                    </div>
                );
            })}
        </div>
    );
});

export default function ConnectedViewListFavoriteMovies(props) {
    const { state } = useContext(AppContext);
    const favoriteMovies = state.user
        ? state.favoriteMovies
        : [];

    return <ViewListFavoriteMovies {...props} favoriteMovies={favoriteMovies} />
}