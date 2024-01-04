import React from 'react';

function MovieCard({movie, genres}) {
    const year = (movie.first_air_date ? movie.first_air_date.split('-')[0] : (movie.release_date ? movie.release_date.split('-')[0] : null))
    return (
        <div className='movie'>
            <img className='moviePoster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='poster' />
            <div className='movieDetails'>
                <div className="movieTitle"><span className='movieDetail'>Title: </span>{movie.name ? movie.name : (movie.title ? movie.title : null)}</div>
                <div className="movieYear"><span className='movieDetail'>Year: </span>{year ? year : null}</div>
                <div className='movieGenres'><span className='movieDetail'>Genre: </span>
                    {movie.genre_ids && movie.genre_ids.map((genreID, index) => {
                        return genres.map((genre) => (
                            genre.id === genreID ? 
                                index===movie.genre_ids.length-1 ? <div key={index} className='movieGenre'>{genre.name}</div>  : <div key={index} className='movieGenre'>{genre.name}</div> 
                            : null
                        ))
                    })}
                </div>
            </div>
        </div>
    )
}

export default MovieCard;